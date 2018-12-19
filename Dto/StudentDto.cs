using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.Dto
{
    public class StudentDto
    {
         public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public int GradeId { get; set; }
        public Pair Grade { get; set; }
        public int SexId { get; set; }
        [ForeignKey("SexId")]
        public SexDto Sex { get; set; }
        public string Password { get; set; }
      
    }
}