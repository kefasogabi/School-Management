using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PROJECT.Models
{

    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string DateOfBirth { get; set; }

        public string FileName { get; set; }
   

    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Sex> Sex { get; set; }
        public DbSet<Grade> Grade { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                : base(options)
            {
            }

            // protected override void OnModelCreating(ModelBuilder builder)
            // {
            //     base.OnModelCreating(builder);
            //     builder.Entity<ApplicationUser>()
            //     .ToTable("User");

            //     builder.Entity<IdentityRole>()
            //     .ToTable("Role");

            //     builder.Entity<IdentityUserRole>()
            //     .ToTable("UserRole");

            //     builder.Entity<IdentityUserClaim>()
            //     .ToTable("UserClaim");

            //     builder.Entity<IdentityUserLogin>()
            //     .ToTable("UserLogin");
            // }
    }
}