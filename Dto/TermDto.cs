using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PROJECT.Dto
{
    public class TermDto : Pair
    {
        public ICollection<StudentDto> Students { get; set; }

        public TermDto()
        {
            Students = new Collection<StudentDto>();
        }
    }
}