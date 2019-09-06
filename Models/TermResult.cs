namespace PROJECT.Models
{
    public class TermResult
    {
        public int TermId { get; set; }
        public int ResultId { get; set; }
        public Result Result { get; set; }
        public Term Term { get; set; }
    }
}