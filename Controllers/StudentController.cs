using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PROJECT.Dto;
using PROJECT.Helper;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Controllers
{
    // [Authorize]
    [Route("[controller]")]
    public class StudentController : Controller
    {
        private readonly IStudentService studentService;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly AppSettings appSettings;

        public StudentController(IStudentService studentService, ApplicationDbContext context, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            this.studentService = studentService;
            this.context = context;
            this.mapper = mapper;
            this.appSettings = appSettings.Value;
        }


        [AllowAnonymous]
        [HttpPost("/api/Login")]
        public IActionResult Authenticate([FromBody]StudentDto studentDto)
        {
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
                Token = tokenString,
                Id = student.Id,
               
            });
        }


        [AllowAnonymous]
        [HttpPost("/api/Register")]
        public IActionResult Register([FromBody]StudentDto studentDto)
        {
            // map dto to entity
            var student = mapper.Map<Student>(studentDto);

            try 
            {
               
                // save 
                studentService.Create(student, studentDto.Password  );
                return Ok(student);
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
           
        }


        [HttpGet("/api/students")]
        public IActionResult GetAll()
        {
            var student =  studentService.GetAll();
            var studentDto = mapper.Map<IList<StudentDto>>(student);
            return Ok(studentDto);
        }

        [HttpGet("/api/student/{id}")]
        public IActionResult GetById(int id)
        {
            var student =  studentService.GetById(id);
            var studentDto = mapper.Map<StudentDto>(student);
            return Ok(studentDto);
        }


        [HttpPut("/api/student/{id}")]
        public IActionResult Update(int id, [FromBody]StudentDto studentDto)
        {
            // map dto to entity and set id
            var student = mapper.Map<Student>(studentDto);
            student.Id = id;

            try 
            {
                // save 
                studentService.Update(student, studentDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("/api/student/{id}")]
        public IActionResult Delete(int id)
        {
            studentService.Delete(id);
            return Ok();
        }

        [HttpPut("api/changepassword/{id}")]
        public IActionResult ChangePassword(int id, [FromBody]StudentDto studentDto)
        {
           // map dto to entity and set id
            var student = mapper.Map<Student>(studentDto);
            student.Id = id;

            try 
            {
                // save 
                studentService.ChangePassword(student, studentDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
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