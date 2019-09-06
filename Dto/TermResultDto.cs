namespace PROJECT.Dto
{
    public class TermResultDto
    {
        public int TermId { get; set; }
        public int ResultId { get; set; }
        public ResultDto Result { get; set; }
        public Pair Term { get; set; }
    }
}