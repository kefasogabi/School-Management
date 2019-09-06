using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.Dto
{
    public class StudentDto
    {
         public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string UserName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public int GradeId { get; set; }
        public Pair Grade { get; set; }
        public int SexId { get; set; }
        public SexDto Sex { get; set; }
        [Required]
        public string Password { get; set; }
        public int SessionId { get; set; }
        public Pair Session { get; set; }
        public string FileName { get; set; }
        public string Country { get; set; }
        public string state { get; set; }
        public string LGA { get; set; }
        public int GenoTypeId { get; set; }
        public Pair GenoType { get; set; }
        public int BloodGroupId { get; set; }
        public Pair BloodGroup { get; set; }
        public int ReligionId { get; set; }
        public Pair Religion { get; set; }
        public string HairColor { get; set; }
        public string NKName { get; set; }
        public string NKPhoneNumber { get; set; }
        public int NKRelationshipId { get; set; }   
        public Pair NKRelationship { get; set; }
        public string NKAddress { get; set; }
        public ICollection<ResultDto> Results { get; set; }

        public ICollection<Pair> Terms { get; set; }

        public StudentDto()
        {
            Terms = new Collection<Pair>();
            Results = new Collection<ResultDto>();
        }
      
    }
}