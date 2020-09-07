using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PROJECT.Dto;
using PROJECT.Helper;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Controllers
{
    [Route("[controller]")]
    public class StudentController : Controller
    {
        private readonly IStudentService studentService;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IHostingEnvironment host;
        private readonly AppSettings appSettings;
        private readonly ClaimsPrincipal caller;

        public StudentController(IStudentService studentService,
                                 IOptions<AppSettings> appSettings, 
                                 IMapper mapper,
                                 IUnitOfWork unitOfWork,
                                 IHttpContextAccessor httpContextAccessor,
                                 IHostingEnvironment host)
        {
            this.studentService = studentService;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.host = host;
            caller = httpContextAccessor.HttpContext.User;
            this.appSettings = appSettings.Value;
        }


        [AllowAnonymous]
        [HttpPost("/api/Login")]
        public IActionResult Authenticate([FromBody]StudentDto studentDto)
        {
                if(!ModelState.IsValid)
                {
                    BadRequest("Please fill in Username and Password");
                }
            var student = studentService.Authenticate(studentDto.UserName, studentDto.Password);

            if (student == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, student.Id.ToString()),
                     new Claim(ClaimTypes.GivenName, student.UserName.ToString()),
                 

                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new {
                token = tokenString 
            });
        }


        [Authorize(Roles = RoleName.Admin)]
                
        public IActionResult Register([FromBody]StudentDto studentDto)
        {
           
            try{
                 // map dto to entity
                var student = mapper.Map<Student>(studentDto);
                // save 
                studentService.Create(student, studentDto.Password  );
                unitOfWork.CompleteAsync();
                return Ok(student); 
            }
             catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
           
        }


        [HttpGet("/api/students")]
        public async Task<IEnumerable<StudentDto>> GetAll()
        {
            var student = await studentService.GetAllAsync();
           
           return mapper.Map<IEnumerable<Student>, IEnumerable<StudentDto>>(student);
          
        }

        [HttpGet("/api/student/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            // await studentService.CreateTestUsers();
            var student = await studentService.GetByIdAsync(id);
            var studentDto = mapper.Map<StudentDto>(student);
            return Ok(studentDto);
        }

        [Authorize(Roles = RoleName.Admin)]
        [HttpPut("/api/student/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]StudentDto studentDto)
        {
            // map dto to entity and set id
            var student = mapper.Map<Student>(studentDto);
            student.Id = id;

            try 
            {
                // save 
                studentService.Update(student, studentDto.Password);
                await unitOfWork.CompleteAsync();
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = RoleName.Admin)]
        [HttpDelete("/api/student/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            studentService.Delete(id);
            await unitOfWork.CompleteAsync();
            return Ok();
        }

        [HttpPut("/api/changepassword")]
        public async Task<IActionResult> ChangePassword( [FromBody]ChangePasswordDto changePasswordDto)
        {
            var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);
           // map dto to entity and set id
            var student = mapper.Map<ChangePassword>(changePasswordDto);
            
            student.Id = Convert.ToInt32(userId.Value);

            try 
            {
                // save 
                studentService.ChangePassword(student, changePasswordDto.Password);
                await unitOfWork.CompleteAsync();
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("/api/resetPassword/{id}")]
        public async Task<IActionResult> ResetPassword( int id, [FromBody]ChangePasswordDto changePasswordDto)
        {
            
           // map dto to entity and set id
            var student = mapper.Map<ChangePassword>(changePasswordDto);
            
            student.Id = id;

            try 
            {
                // save 
                studentService.ChangePassword(student, changePasswordDto.Password);
                await unitOfWork.CompleteAsync();
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = RoleName.Admin)]
        [HttpPost("/api/StudentUpload/{id}")]
        public async Task<IActionResult> UploadImage( int id, IFormFile file)
        {
            var student = await studentService.GetByIdAsync(id);

                studentService.UploadImage(student.Id, file);

                await unitOfWork.CompleteAsync();

                    return Ok();
        }

        [HttpGet("/api/studentProfile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);
            
           var student = await studentService.GetByIdAsync(Convert.ToInt32(userId.Value));
           var studentDto = mapper.Map<StudentDto>(student);
            
            return Ok(studentDto );
        }

        [AllowAnonymous]
        [HttpGet("/api/GenerateRRR")]
        public string GenerateRRR()
        {
            return studentService.GenerateRRR();
        }

        
       
        // public string GeneratePassword()
        // {
        //     string PasswordLength = "6";
            
        //         string NewPassword = "";
            
        //         string allowedChars = "";           
            
        //         allowedChars = "1,2,3,4,5,6,7,8,9,0";   
        //         allowedChars += "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";
        //         allowedChars += "~,!,@,#,$,%,^,&,*,+,?";
        //         char[] sep = { ',' };
        //         string[] arr = allowedChars.Split(sep);
        //         string IDString = "";
        //         string temp = "";
        //         Random rand = new Random(); 
        //         for (int i = 0; i < Convert.ToInt32(PasswordLength); i++)
        //         {
        //             temp = arr[rand.Next(0, arr.Length)];
        //             IDString += temp;
        //             NewPassword = IDString;          
        //         }
        //             return NewPassword;
        // }

        
    }
}