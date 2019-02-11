using System.Threading.Tasks;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext context;

        public UnitOfWork( ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}