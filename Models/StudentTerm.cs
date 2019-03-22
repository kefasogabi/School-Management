namespace PROJECT.Models
{
    public class StudentTerm
    {
        public int StudentId { get; set; }
        public int TermId { get; set; }
        public Student Student { get; set; }    
        public Term Term { get; set; } 
    }
}