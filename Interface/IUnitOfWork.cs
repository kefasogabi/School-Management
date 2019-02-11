using System.Threading.Tasks;

namespace PROJECT.Interface
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}