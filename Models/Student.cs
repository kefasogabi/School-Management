using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PROJECT.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string UserName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public int GradeId { get; set; }
        public Grade Grade { get; set; }
        public int SexId { get; set; }
        [ForeignKey("SexId")]
        public Sex  Sex { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int SessionId { get; set; }
        public Sessions Session { get; set; }
        public string FileName { get; set; }
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
        public ICollection<Result> Results { get; set; }
        public string NKPhoneNumber { get; set; }
        public int? NKRelationshipId { get; set; } 
        [ForeignKey("NKRelationshipId")]  
        public NextKinRelationship NKRelationship { get; set; }
        public string NKAddress { get; set; }
        public ICollection<StudentTerm> Terms { get; set; }
        public Student()
        {
            Terms = new Collection<StudentTerm>();
            Results = new Collection<Result>();
        }
        
    }
}