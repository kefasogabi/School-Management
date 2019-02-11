using System.Collections.Generic;
using System.Threading.Tasks;
using PROJECT.Models;

namespace PROJECT.Interface
{
    public interface ISessionService
    {
        IEnumerable<Sessions> GetAll();
        Sessions GetById(int id);
        void Create(Sessions session);
        void Update(Sessions session);
        void Delete(int id);
    }
}