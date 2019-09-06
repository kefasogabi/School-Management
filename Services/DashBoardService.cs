using System.Linq;
using System.Threading.Tasks;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Services
{
    public class DashBoardService : IDashBoardService
    {
        private readonly ApplicationDbContext context;

        public DashBoardService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public int TotalBoys()
        {
            var boys =  context.Students.Where(c => c.Sex.Name == "Male").Count();
            return boys;
        }

        public int TotalGirls()
        {
           var girls =  context.Students.Where(c => c.Sex.Name == "Female").Count();
            return girls;
        }

        public int AllStudent()
        {
            var students = context.Students.Count();
            return students;
        }

        public int AllStaff()
        {
            var staffs = context.Users.Count();
            return staffs;
        }

        public int[] StaffGenders()
        {
            var male = context.Users.Where(c => c.Sex.Name == "Male").Count();
            var female = context.Users.Where(c => c.Sex.Name == "Female").Count();

            var all = new int[] {male, female};
            return all;
        }

        public int[] Grages()
        {
            var jss1 = context.Students.Where( c => c.Grade.Name == "JSS1").Count();
            var jss2 = context.Students.Where( c => c.Grade.Name == "JSS2").Count();
            var jss3 = context.Students.Where( c => c.Grade.Name == "JSS3").Count();
            var sss1 = context.Students.Where( c => c.Grade.Name == "SSS1").Count();
            var sss2 = context.Students.Where( c => c.Grade.Name == "SSS2").Count();
            var sss3 = context.Students.Where( c => c.Grade.Name == "SSS3").Count();
            
            var grade = new int[] {jss1, jss2, jss3, sss1, sss2, sss3};
            return grade; 
        
        }

        public int[] GragesMale()
        {
            var jss1 = context.Students.Where( c => c.Grade.Name == "JSS1").Where(c => c.Sex.Name == "Male").Count();
            var jss2 = context.Students.Where( c => c.Grade.Name == "JSS2").Where(c => c.Sex.Name == "Male").Count();
            var jss3 = context.Students.Where( c => c.Grade.Name == "JSS3").Where(c => c.Sex.Name == "Male").Count();
            var sss1 = context.Students.Where( c => c.Grade.Name == "SSS1").Where(c => c.Sex.Name == "Male").Count();
            var sss2 = context.Students.Where( c => c.Grade.Name == "SSS2").Where(c => c.Sex.Name == "Male").Count();
            var sss3 = context.Students.Where( c => c.Grade.Name == "SSS3").Where(c => c.Sex.Name == "Male").Count();

            var grade = new int[] {jss1, jss2, jss3, sss1, sss2, sss3};
            return grade;
            
        }

        public int[] GragesFemale()
        {
            var jss1 = context.Students.Where( c => c.Grade.Name == "JSS1").Where(c => c.Sex.Name == "Female").Count();
            var jss2 = context.Students.Where( c => c.Grade.Name == "JSS2").Where(c => c.Sex.Name == "Female").Count();
            var jss3 = context.Students.Where( c => c.Grade.Name == "JSS3").Where(c => c.Sex.Name == "Female").Count();
            var sss1 = context.Students.Where( c => c.Grade.Name == "SSS1").Where(c => c.Sex.Name == "Female").Count();
            var sss2 = context.Students.Where( c => c.Grade.Name == "SSS2").Where(c => c.Sex.Name == "Female").Count();
            var sss3 = context.Students.Where( c => c.Grade.Name == "SSS3").Where(c => c.Sex.Name == "Female").Count();

            var grade = new int[] {jss1, jss2, jss3, sss1, sss2, sss3};
            return grade;
            
        }

        
    }
}