using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using PROJECT.Models;

namespace PROJECT.Interface
{
    public interface IStudentService
    {
        Student Authenticate(string userName, string password);
        Task<IEnumerable<Student>> GetAllAsync();
        Task<Student> GetByIdAsync(int id);
        Student Create(Student student, string password);
        void Update(Student student, string password = null);
        void ChangePassword( ChangePassword changePassword, string password = null);
        void Delete(int id);
        void UploadImage(int id, IFormFile file);
        string GenerateRRR();

    //    Task CreateTestUsers();
    }
}