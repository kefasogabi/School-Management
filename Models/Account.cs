using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.Models
{
    public class Account
    {
        public class LoginViewModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public string Password { get; set; }

        }


        public class RegisterViewModel
        {
            public string Id { get; set; }
            [Required]
            [EmailAddress]
            public string Email { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Address { get; set; }
            public string DateOfBirth { get; set; }
            public string UserName { get; set; }
            [Required]
            public string Password { get; set; }
            public string Role { get; set; }
            public int? SexId { get; set; }
            [ForeignKey("SexId")]
            public Sex  Sex { get; set; }
            public string Country { get; set; }
            public string state { get; set; }
            public string LGA { get; set; }
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
            public int NKRelationshipId { get; set; } 
            [ForeignKey("NKRelationshipId")]  
            public NextKinRelationship NKRelationship { get; set; }
            public string NKAddress { get; set; }
           

           
        }




    }
}