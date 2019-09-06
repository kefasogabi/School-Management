using System.Collections.Generic;
using System.Threading.Tasks;
using PROJECT.Models;

namespace PROJECT.Interface
{
    public interface IResultService
    {
         void Create(StudentTerm studentTerm);
         void Save(Result result);
        Task<Student> GetStudent(string name);
        
    }
}