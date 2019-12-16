using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Repository
{
    public class TermService : ITermService
    {
        private readonly ApplicationDbContext context;

        public TermService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public void Create(Term term)
        {
            context.Terms.Add(term);
        }

        public void Delete(int id)
        {
            var term = context.Terms.SingleOrDefault(c => c.Id == id);
            if(term != null){
                context.Terms.Remove(term);
            }

        }

        public async Task<IEnumerable<Term>> GetAllAsync()
        {
           return await context.Terms.OrderByDescending(x => x.Id).ToListAsync();
        }

        public async Task<Term> GetByIdAsync(int id)
        {
           return await context.Terms.SingleOrDefaultAsync(c => c.Id == id);
        }

        public void Update(Term term)
        {
            var terms = context.Terms.Find(term.Id);

            if(terms == null)
                throw new ApplicationException("Term not found");
            
            terms.Name = term.Name;

            context.Terms.Update(terms);
        }
    }
}