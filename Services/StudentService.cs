using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PROJECT.Helper;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Repository
{
    public class StudentService : IStudentService
    {
        private readonly string[] Accepted_file = new[] {".jpg", ".jpeg", ".png"};
        private readonly ApplicationDbContext context;
        private readonly IHostingEnvironment host;

        public StudentService(ApplicationDbContext context, IHostingEnvironment host)
        {
            this.host = host;
            this.context = context;
        }
        public Student Authenticate(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
                throw new AppException("Please fill in Username and Password");

            var student = context.Students.SingleOrDefault(x => x.UserName == userName);

            // check if username exists
            if (student == null)
                throw new AppException("User not found");

            // check if password is correct
            if (!VerifyPasswordHash(password, student.PasswordHash, student.PasswordSalt))
                throw new AppException("Password is incorrect");

            // authentication successful
            return student;
        }



        public Student Create(Student student, string password)
        {

            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (context.Students.Any(x => x.UserName == student.UserName))
                throw new AppException("UserName " + student.UserName + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            student.PasswordHash = passwordHash;
            student.PasswordSalt = passwordSalt;
            student.Session = context.Session.Last();
            // student.Term = context.Terms.FirstOrDefault();
            student.FileName = "avatar.jpg";
            context.Students.Add(student);


            return student;
        }



        public void Delete(int id)
        {
            var student = context.Students.SingleOrDefault(c => c.Id == id);
            if (student != null)
            {
                context.Students.Remove(student);

            }
        }

        

        public async Task<IEnumerable<Student>> GetAllAsync()
        {
            return await context.Students.Include(c => c.Sex)
                                    .Include(c => c.Grade)
                                    .Include(c => c.Session).ToListAsync();
        }

        public async Task<Student> GetByIdAsync(int id)
        {
            return await context.Students.Include(c => c.Sex)
                                    .Include(t => t.Terms)
                                    .ThenInclude(st => st.Term)
                                    .OrderByDescending( x => x.Id)
                                    .Include(c => c.Grade)
                                    .Include(b => b.BloodGroup)
                                    .Include(g => g.GenoType)
                                    .Include(n => n.NKRelationship)
                                    .Include(r => r.Religion)
                                    .Include(c => c.Results)
                                    .Include(c => c.Session).SingleOrDefaultAsync(x => x.Id == id);
        }

        public void Update(Student student, string password = null)
        {
            var students = context.Students.Find(student.Id);

            if (students == null)
                throw new AppException("User not found");

            if (student.UserName != students.UserName)
            {
                // username has changed so check if the new username is already taken
                if (context.Students.Any(x => x.UserName == student.UserName))
                    throw new AppException("UserName " + student.UserName + " is already taken");
            }

            // update user properties


            students.UserName = student.UserName;
            students.Address = student.Address;
            students.FirstName = student.FirstName;
            students.LastName = student.LastName;
            students.DateOfBirth = student.DateOfBirth;
            students.SexId = student.SexId;
            students.GradeId = student.GradeId;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                students.PasswordHash = passwordHash;
                students.PasswordSalt = passwordSalt;
            }

            context.Students.Update(students);

        }

        public void ChangePassword(ChangePassword changePassword, string password = null)
        {
            var students = context.Students.Find(changePassword.Id);

            if (students == null)
                throw new AppException("User not found");


            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                students.PasswordHash = passwordHash;
                students.PasswordSalt = passwordSalt;
            }

            context.Students.Update(students);
            
        }

        

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public void UploadImage(int id, IFormFile file)
        {
             var student = context.Students.Find(id);

            if (student == null)
                throw new AppException("User not found");

            // if(file.Length > 10 * 1024 * 1024) throw new ApplicationException("Max File Size exceeded");
            // if(!Accepted_file.Any(s => s == Path.GetExtension(file.FileName))) throw new ApplicationException("Invalid File Type");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

                     using( var stream = new FileStream(filePath, FileMode.Create))
                    {
                       file.CopyTo(stream);
                    }

                    student.FileName = fileName;

                    context.Students.Update(student);
        }

        public async Task<Student> GetProfile(int id)
        {
           return await context.Students.Include(c => c.Sex)
                                    .Include(c => c.Grade)
                                    .Include(b => b.BloodGroup)
                                    .Include(g => g.GenoType)
                                    .Include(n => n.NKRelationship)
                                    .Include(r => r.Religion)
                                    .Include(c => c.Results)
                                    .Include(t => t.Terms)
                                    .ThenInclude(st => st.Term)
                                    .Include(c => c.Session).SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}