using System.Collections.Generic;
using System.Threading.Tasks;
using PROJECT.Models;

namespace PROJECT.Interface
{
    public interface ITermService
    {
        Task<IEnumerable<Term>> GetAllAsync();
        Task<Term> GetByIdAsync(int id);
        void Create(Term term);
        void Update(Term term);
        void Delete(int id);
    }
}