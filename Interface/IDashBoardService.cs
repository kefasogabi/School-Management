using System.Threading.Tasks;
using PROJECT.Models;

namespace PROJECT.Interface
{
    public interface IDashBoardService
    {
         int TotalBoys();
         int TotalGirls();
         int AllStudent();
         int AllStaff();
         int[] Grages();
         int[] StaffGenders();
         int[] GragesMale();
         int[] GragesFemale();
    }
}