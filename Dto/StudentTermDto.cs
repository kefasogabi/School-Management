namespace PROJECT.Dto
{
    public class StudentTermDto
    {
        public int StudentId { get; set; }
        public int TermId { get; set; }
        public StudentDto Student { get; set; }    
        public Pair Term { get; set; } 
    }
}