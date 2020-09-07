using System.Collections.Generic;
using System.Threading.Tasks;
using PROJECT.Models;

namespace PROJECT.Interface
{
    public interface IResultService
    {
         void Create(StudentTerm studentTerm);
         void Save(List<Result> results);
        Task<Student> GetStudent(string name);
        Result GetById(int id);
        void Update(Result result);
        void Delete(int id);
        // Task<Result> GetUserResult(Result result);
        
    }
}