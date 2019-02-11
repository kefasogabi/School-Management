using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace PROJECT.Models
{
    public class Sessions
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Student> Students { get; set; }
        public Sessions()
        {
            Students = new Collection<Student>();
        }
    }
}