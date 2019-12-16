using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Services
{
    public class ResultService : IResultService
    {
        private readonly ApplicationDbContext context;

        public ResultService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Create(StudentTerm studentTerm)
        {
            context.Add(studentTerm);
        }

        public void Save(Result result)
        {
            context.Add(result);
        }

        public Result GetById(int id)
        {
            return context.Results.SingleOrDefault(c => c.Id == id);
        }

        public void Update(Result result)
        {
            var results = context.Results.Find(result.Id);
            if(results == null)
            throw new ApplicationException("Result not found");

            results.Name = result.Name;
            results.Ass1 = result.Ass1;
            results.Ass2 = result.Ass2;
            results.CA1 = result.CA1;
            results.CA2 = result.CA2;
            results.Exam = result.Exam;

            context.Results.Update(results);
        }

        public void Delete(int id)
        {
            var results = context.Results.SingleOrDefault( c => c.Id == id);

            if(results != null)
            {
                context.Remove(results);
            }
        }


        public async Task<Student> GetStudent(string name)
        {
            var student = await context.Students.Include(t => t.Terms)
                                                .ThenInclude(st => st.Term)
                                                .OrderByDescending( x => x.Id)
                                                .Include(c => c.Grade)
                                                .Include(r => r.Results)
                                                .SingleOrDefaultAsync(c => c.UserName == name);
            return student;
        }

        // public async Task<Result> GetUserResult(Result result)
        // {
        //     var results = await context.Results.Where(c => c.Year == result.Year)
        //                                         .SingleOrDefaultAsync(c => c.StudentId == result.StudentId);
        //     return results;
        // }
      
    }
}