using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Models;

namespace PROJECT.Controllers
{

    [Route("[controller]/[action]")]
    public class RoleController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;

        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        [Authorize(Roles = RoleName.Admin)]
        [AllowAnonymous]
        [HttpGet("/api/GetRoles")]
        public IActionResult GetRoles()
        {
            var roles = roleManager.Roles.Select(x => new{x.Id, x.Name}).ToList();
            return Ok(roles);
        }

        [HttpGet("/api/GetRole/{id}")]
        public IActionResult GetRole(string id)
        {
            var role = roleManager.Roles.SingleOrDefault(c => c.Id == id);

            if(role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        [HttpPost("/api/PostRole")]
        public async  Task<IActionResult> AddRole([FromBody] Roles role)
        {
           bool  x = await roleManager.RoleExistsAsync(role.Name);
            if (!x)
            {
                var roles = new IdentityRole();
                roles.Name = role.Name;
                await roleManager.CreateAsync(roles);
            }

            return Ok();
        }

        [HttpPut("/api/updateRole/{id}")]
        public async Task<IActionResult> UpdateRole(string id, [FromBody] Roles roles)
        {
            var role = roleManager.Roles.SingleOrDefault(c => c.Id == id);

            if(role == null)
            {
                return NotFound();
            }

            role.Name = roles.Name;
            await roleManager.UpdateAsync(role);
            return Ok();

            
        }

        [HttpDelete("/api/DeleteRole/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var role = roleManager.Roles.SingleOrDefault( c => c.Id == id);
            if(role == null)
            {
                return NotFound();
            }

           await roleManager.DeleteAsync(role);
            return Ok();
        }

    }
}