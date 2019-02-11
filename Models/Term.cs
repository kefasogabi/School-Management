using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PROJECT.Models
{
    public class Term
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Student> Students { get; set; }
        public Term()
        {
            Students = new Collection<Student>();
        }
    }
}