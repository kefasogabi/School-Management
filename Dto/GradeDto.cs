using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PROJECT.Dto
{
    public class GradeDto : Pair
    {
       
        public ICollection<StudentDto> Students { get; set; }
        public GradeDto()
        {
            Students = new Collection<StudentDto>();
        }
    }
}