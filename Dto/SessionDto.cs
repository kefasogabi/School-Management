using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PROJECT.Dto
{
    public class SessionDto : Pair
    {
        public ICollection<StudentDto> Students { get; set; }

        public SessionDto()
        {
            Students = new Collection<StudentDto>();
        }
    }
}