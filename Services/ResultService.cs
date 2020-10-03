using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PROJECT.Helper;
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

        public void Save(List<Result> results)
        {
            try{
                foreach(Result result in results)
                {
                    context.Add(result);
                }
            }
            catch(AppException ex)
            {
                throw ex;
            }
            
        }

        public async Task<List<Result>> GetResultsById(int? id)
        {
            var results = new List<Result>();
            try{
                results = await context.Results.Where(c => c.StudentId == id).ToListAsync();
            }
            catch(AppException ex)
            {
                throw ex;
            }
            return results;
        }

        public async Task<Result> GetById(int id)
        {
            var result = new Result();
            try{
                result = await context.Results.SingleOrDefaultAsync(c => c.Id == id);
            }
            catch(AppException ex)
            {
                throw ex;
            }
            return result;
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
                                                .SingleOrDefaultAsync(c => c.UserName == name);
            return student;
        }

        
      
    }
}