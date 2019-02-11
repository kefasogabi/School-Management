using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
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
        public int TermId { get; set; }
        public Term Term { get; set; }
        public string FileName { get; set; }
        // public ICollection<Term> Terms { get; set; }
        // public Student()
        // {
        //     Terms = new Collection<Term>();
        // }
        
    }
}