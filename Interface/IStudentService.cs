using System.Collections.Generic;
using PROJECT.Models;

namespace PROJECT.Interface
{
    public interface IStudentService
    {
        Student Authenticate(string userName, string password);
        IEnumerable<Student> GetAll();
        Student GetById(int id);
        Student Create(Student student, string password);
        void Update(Student student, string password = null);
        void ChangePassword( Student student, string password = null);
        void Delete(int id);
       
    }
}