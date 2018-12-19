using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PROJECT.Models
{
    public class Grade
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Student> Students { get; set; }
        public Grade()
        {
            Students = new Collection<Student>();
        }
    }
}