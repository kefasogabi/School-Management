using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PROJECT.Helper;
using PROJECT.Models;
using Microsoft.Extensions.Options;
using static PROJECT.Models.Account;
using System.Linq;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using PROJECT.Dto;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace PROJECT.Controllers
{
    [Route("[controller]/[action]")]
    [Authorize]
    public class AccountController : Controller
    {
        private readonly string[] Accepted_file = new[] {".jpg", "jpeg", ".png"};
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IHostingEnvironment host;
        private readonly ClaimsPrincipal caller;
        private readonly AppSettings appSettings;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<AppSettings> appSettings,
            RoleManager<IdentityRole> roleManager,
            IHostingEnvironment host,
            IHttpContextAccessor httpContextAccessor
        )
        {

            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.host = host;
            caller = httpContextAccessor.HttpContext.User;
            this.appSettings = appSettings.Value;
        }

    

            [AllowAnonymous]
            [HttpPost]
            public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
            {
               
               if(!ModelState.IsValid)
               {
                   return BadRequest(ModelState);
               }

               bool x = await roleManager.RoleExistsAsync("Admin");
                if (!x)
                {
                    var role = new IdentityRole();
                    role.Name = "Admin";
                    await roleManager.CreateAsync(role);
                }

                x = await roleManager.RoleExistsAsync("Staff");
                if (!x)
                {
                    var role = new IdentityRole();
                    role.Name = "Staff";
                    await roleManager.CreateAsync(role);
                }

               if(userManager.Users.Any(y => y.Email == model.Email))
                    return BadRequest("Email " + model.Email + " is already taken");

                    var user = new ApplicationUser {
                        UserName = model.Email,
                        Email = model.Email,
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Address = model.Address,
                        DateOfBirth = model.DateOfBirth,
                        };

                    IdentityResult result = await userManager.CreateAsync(user, model.Password);
                    
                    
                  await userManager.AddToRoleAsync(user,  model.Role );

                    if(!result.Succeeded){
                        var err = "Uknown Error occured when processing Your Request";
                        return BadRequest(err);
                    }
                    
                   return Ok(model);
               
            }


            [HttpPut("{id}")]
            public async Task<IActionResult> Update([FromBody] RegisterViewModel model )
            {
               
                var user = await userManager.FindByIdAsync(model.Id);

                if(user == null)
                {
                     return NotFound();
                }
               

                if(model.Email != user.Email )
                {
                    // email has changed so check if the new email is already taken
                    if(userManager.Users.Any(c => c.Email == model.Email))
                    {
                        return BadRequest("Email " + model.Email + " is already taken");
                    }
                }
                // update user property
                user.Email = model.Email;
                user.UserName = model.Email;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Address = model.Address;
                user.DateOfBirth = model.DateOfBirth;

               await userManager.UpdateAsync(user);
              
                return Ok();
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> UploadImage([FromBody] UploadImage model, IFormFile file)
            {

                var user = await userManager.FindByIdAsync(model.Id);

                if(user == null)
                {
                     return NotFound();             
                }

                if(file.Length > 10 * 1024) return BadRequest("Max File Size exceeded");
                if(!Accepted_file.Any(s => s == Path.GetExtension(file.FileName))) return BadRequest("Invalid File Type");

                var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
                if(!Directory.Exists(uploadsFolderPath))
                    Directory.CreateDirectory(uploadsFolderPath);
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(uploadsFolderPath, fileName);

                    using( var stream = new FileStream(filePath, FileMode.Create))
                    {
                       await file.CopyToAsync(stream);
                    }

                    user.FileName = fileName;

                 await userManager.UpdateAsync(user);


                return Ok();
            }



            [AllowAnonymous]
            [HttpPost]
            public async Task<IActionResult> Login([FromBody] LoginViewModel model)
            {
                
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (result.Succeeded)
                {
                    var user = userManager.Users.SingleOrDefault(c => c.Email == model.Email);
                    return  GenerateJwtToken(model.Email, user);
                }
                
                throw new ApplicationException("Unknown Error"); 
            }

            [AllowAnonymous]
            private  IActionResult GenerateJwtToken(string email, ApplicationUser user)
            {
            
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] 
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email.ToString()),
                        new Claim(ClaimTypes.GivenName, user.FirstName.ToString()),
                        new Claim(ClaimTypes.UserData, user.LastName.ToString()),
                        new Claim(ClaimTypes.StreetAddress, user.Address.ToString()),
                        new Claim(ClaimTypes.DateOfBirth, user.DateOfBirth.ToString()),
                        
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);
            
                return Ok(new{ token = tokenString });

               // new JwtSecurityTokenHandler().WriteToken(token)
            }

            [HttpGet]
           public async Task<IActionResult> GetAll()
           {
               var users = await userManager.Users.ToListAsync();
               return Ok(users);
           } 

            [HttpGet("{id}")]
           public async Task<IActionResult> GetById(string id)
           {
               var user = await userManager.Users.SingleOrDefaultAsync(c => c.Id == id);

               if(user == null)
               {
                   return NotFound();
               }

               return Ok(user);
           }

           [HttpGet("/api/profile")]
           public IActionResult Index()
           {
            
            var claimIdentity = this.User.Identity as ClaimsIdentity;
            IEnumerable<Claim> claims = claimIdentity.Claims;

            var model = new IndexViewModel
            {
                Id = claimIdentity.FindFirst(ClaimTypes.Name).Value,
                Email = claimIdentity.FindFirst(ClaimTypes.Email).Value,
                FirstName = claimIdentity.FindFirst(ClaimTypes.GivenName).Value,
                LastName = claimIdentity.FindFirst(ClaimTypes.UserData).Value,
                Address = claimIdentity.FindFirst(ClaimTypes.StreetAddress).Value,
                DateOfBirth = claimIdentity.FindFirst(ClaimTypes.DateOfBirth).Value,
               
            };
           

                return Ok(model);
               
           }


           [HttpDelete("{id}")]
           public async Task<IActionResult> Delete(string id)
           {
               var user = await userManager.Users.SingleOrDefaultAsync(c => c.Id == id);

               if(user == null)
               {
                   return NotFound();
               }

                await userManager.DeleteAsync(user);

               return Ok();
           }


        //    [HttpGet("/api/getPassword")]
        //     public IActionResult ChangePassword()
        //     {
        //         var claimIdentity = this.User.Identity as ClaimsIdentity;
        //         IEnumerable<Claim> claims = claimIdentity.Claims;
        //          var model = new IndexViewModel
        //         {
        //             Id = claimIdentity.FindFirst(ClaimTypes.Name).Value              
        //         };
        //         return View(model);
        //     }

    
           [HttpPost("/api/changePassword")]
           public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
           {
               if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                
                var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);
                var user = await userManager.Users.SingleOrDefaultAsync( c => c.Id == userId.Value);
                // var customer = await _appDbContext.Customers.Include(c => c.Identity).SingleAsync(c => c.Identity.Id == userId.Value);
                // var user = await userManager.GetUserAsync(User);
                
      
                

                if (user == null)
                {
                    BadRequest("User Not Found");
                }

                 var changePasswordResult = await userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                if (!changePasswordResult.Succeeded)
                {
                    var err = "Uknown Error occured when processing Your Request";
                    return BadRequest(err);
                }
                await signInManager.SignInAsync(user, isPersistent: false);
                
               return Ok(model);
           }

           private void AddErrors(IdentityResult result)  
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }




    }
    
}