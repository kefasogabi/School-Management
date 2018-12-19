using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

        public IActionResult GetRoles()
        {
            var roles = roleManager.Roles.Select(x => new{x.Id, x.Name}).ToList();
            return Ok(roles);
        }

    }
}