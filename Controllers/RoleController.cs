using System.Linq;
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
        public IActionResult GetRoles()
        {
            var roles = roleManager.Roles.Select(x => new{x.Id, x.Name}).ToList();
            return Ok(roles);
        }

    }
}