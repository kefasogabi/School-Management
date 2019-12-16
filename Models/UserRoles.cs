using static PROJECT.Models.Account;

namespace PROJECT.Models
{
    public class UserRoles
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public RegisterViewModel User { get; set; }
        public Roles Role { get; set; }
    }
}