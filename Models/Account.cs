using System.ComponentModel.DataAnnotations;

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
            // public string FileName { get; set; }
           

           
        }




    }
}