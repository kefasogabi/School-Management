using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PROJECT.Helper;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Repository
{
    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext context;

        public StudentService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public Student Authenticate(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return null;

            var student = context.Students.SingleOrDefault(x => x.UserName == userName);

            // check if username exists
            if (student == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, student.PasswordHash, student.PasswordSalt))
                return null;

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

            context.Students.Add(student);
            context.SaveChanges();

            return student;
        }

        

        public void Delete(int id)
        {
            var student = context.Students.SingleOrDefault(c => c.Id == id);
            if (student != null)
            {
                context.Students.Remove(student);
                context.SaveChanges();
            }
        }

        public IEnumerable<Student> GetAll()
        {
            return context.Students.Include(c => c.Sex).Include(c => c.Grade).ToList();
        }

        public Student GetById(int id)
        {
            return context.Students.Include(c => c.Sex).Include(c => c.Grade).SingleOrDefault( x => x.Id == id);
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
            // students.Sex.Id = student.Sex.Id;
            // students.GradeId = student.GradeId;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                students.PasswordHash = passwordHash;
                students.PasswordSalt = passwordSalt;
            }

            context.Students.Update(students);
            context.SaveChanges();
        }

        public void ChangePassword(Student student, string password = null)
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
            // students.Sex.Id = student.Sex.Id;
            // students.GradeId = student.GradeId;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                students.PasswordHash = passwordHash;
                students.PasswordSalt = passwordSalt;
            }

            context.Students.Update(students);
            context.SaveChanges();
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

       
    }
}