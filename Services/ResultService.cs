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