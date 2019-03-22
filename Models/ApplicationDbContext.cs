using System.ComponentModel.DataAnnotations.Schema;
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
        public int? SexId { get; set; }
        [ForeignKey("SexId")]
        public Sex  Sex { get; set; }
        public string Country { get; set; }
        public string state { get; set; }
        public string LGA { get; set; }
        public string FileName { get; set; }
        public int? GenoTypeId { get; set; }
        [ForeignKey("GenoTypeId")]
        public GenoType GenoType { get; set; }
        public int? BloodGroupId { get; set; }
        [ForeignKey("BloodGroupId")]
        public BloodGroup BloodGroup { get; set; }
        public int? ReligionId { get; set; }
        [ForeignKey("ReligionId")]
        public Religion Religion { get; set; }
        public string HairColor { get; set; }
        public string NKName { get; set; }
        public string NKPhoneNumber { get; set; }
        public int? NKRelationshipId { get; set; } 
        [ForeignKey("NKRelationshipId")]  
        public NextKinRelationship NKRelationship { get; set; }
        public string NKAddress { get; set; }
        
        



   

    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Sex> Sex { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<Sessions> Session { get; set; }
        public DbSet<Term> Terms { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<BloodGroup> BloodGroups { get; set; }
        public DbSet<GenoType> GenoTypes { get; set; }
        public DbSet<Religion> Religions { get; set; }
        public DbSet<NextKinRelationship> NextKinRelationship { get; set; }
        

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                : base(options)
        {
               
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             modelBuilder.Entity<StudentTerm>().HasKey(st => new 
            { st.StudentId, st.TermId });

            base.OnModelCreating(modelBuilder);  
  
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");

            modelBuilder.Entity<IdentityRole>().ToTable("Roles");

            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");

            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");

            modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");

            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");

            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
            
        }

        
    }
}