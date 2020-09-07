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
using System.Threading;
using Newtonsoft.Json;

namespace PROJECT.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly string[] Accepted_file = new[] {".jpg", ".jpeg", ".png"};
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

    

            [Authorize(Roles = RoleName.Admin)]
            [AllowAnonymous]
            [HttpPost]
            public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
            {
               
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
                        FileName = "avatar.jpg",
                        SexId = model.SexId,
                        Country = model.Country,
                        state = model.state,
                        LGA = model.LGA,
                        HairColor = model.HairColor,
                        BloodGroupId = model.BloodGroupId,
                        GenoTypeId = model.GenoTypeId,
                        ReligionId = model.ReligionId,
                        NKName = model.NKName,
                        NKPhoneNumber = model.NKPhoneNumber,
                        NKRelationshipId = model.NKRelationshipId,
                        NKAddress = model.NKAddress,
                        
                        
                        };

                    IdentityResult result = await userManager.CreateAsync(user, model.Password);
                    
                    
                  await userManager.AddToRoleAsync(user,  model.Role );

                    if(!result.Succeeded){
                        var err = "Uknown Error occured when processing Your Request";
                        return BadRequest(err);
                    }
                    
                   return Ok(model);
               
            }

            [Authorize(Roles = RoleName.Admin)]
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
                user.SexId = model.SexId;
                user.HairColor = model.HairColor;
                user.Country = model.Country;
                user.state = model.state;
                user.LGA = model.LGA;
                user.GenoTypeId = model.GenoTypeId;
                user.NKName = model.NKName;
                user.NKPhoneNumber = model.NKPhoneNumber;
                user.NKAddress = model.NKAddress;
                user.NKRelationshipId = model.NKRelationshipId;
                user.ReligionId = model.ReligionId;
                user.BloodGroupId = model.BloodGroupId;

               await userManager.UpdateAsync(user);
              
                return Ok();
            }

            [HttpPost("/api/upload")]
            public async Task<IActionResult> UploadImage( IFormFile file)
            {

                var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);
                var user = await userManager.Users.SingleOrDefaultAsync( c => c.Id == userId.Value);

                if(user == null)
                {
                     return NotFound();             
                }


                if(file.Length > 10 * 1024 * 1024) return BadRequest("Max File Size exceeded");
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


                return Ok(user);
            }

            [Authorize(Roles = RoleName.Admin)]
            [HttpPost("/api/staffUpload/{id}")]
            public async Task<IActionResult> UploadImage(string id, IFormFile file)
            {
                var user = await userManager.FindByIdAsync(id);
                if(user == null)
                {
                     return NotFound();             
                }

                if(file.Length > 10 * 1024 * 1024) return BadRequest("Max File Size exceeded");
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


                return Ok(user);
            }



            [AllowAnonymous]
            [HttpPost]
            public async Task<IActionResult> Login([FromBody] LoginViewModel model)
            {

                var user = await userManager.FindByNameAsync(model.Email);
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(appSettings.Secret);

                if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                {
                    //Get role assigned to the user
                    var role = await userManager.GetRolesAsync(user);
                    IdentityOptions _options = new IdentityOptions();
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name,user.Id.ToString()),
                            new Claim(ClaimTypes.GivenName,user.FirstName.ToString()),
                            new Claim(ClaimTypes.NameIdentifier,user.LastName.ToString()),
                            new Claim(ClaimTypes.Hash,user.FileName.ToString()),
                            new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var tokenString = tokenHandler.WriteToken(token);
                    return Ok(new{ 
                        token = tokenString,
                        role = role.FirstOrDefault()
                                 });

                }
                else
                    return BadRequest(new { message = "Username or password is incorrect." });
            }


            [Authorize(Roles = RoleName.Admin)]
            [HttpGet]
           public async Task<IActionResult> GetAll()
           {
               var users = await userManager.Users.ToListAsync();
               
               return Ok(users);
           } 

            [Authorize(Roles = RoleName.Admin)]
            [HttpGet("{id}")]
           public async Task<IActionResult> GetById(string id)
           {
               
               var user = await userManager.Users.Include(s => s.Sex)
                                                    .Include(b => b.BloodGroup)
                                                    .Include(g => g.GenoType)
                                                    .Include(n => n.NKRelationship)
                                                    .Include(r => r.Religion)
                                                    .SingleOrDefaultAsync(c => c.Id == id);
                                                    
                
               if(user == null)
               {
                   return NotFound();
               }

               return Ok(user);
           }

           [HttpGet("/api/profile")]
           public async Task<IActionResult>  Index()
           {
              
                var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);

                var user = await userManager.Users.Include(s => s.Sex)
                                                    .Include(b => b.BloodGroup)
                                                    .Include(g => g.GenoType)
                                                    .Include(n => n.NKRelationship)
                                                    .Include(r => r.Religion)
                                                    .SingleOrDefaultAsync( c => c.Id == userId.Value);

                return Ok(user);
               
           }

            [Authorize(Roles = RoleName.Admin)]
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


           [HttpPost("/api/changePassword")]
           public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
           {
               if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                
                var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);
                var user = await userManager.Users.SingleOrDefaultAsync( c => c.Id == userId.Value);
                
                

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

        




    }
    
}