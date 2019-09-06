using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Dto;
using PROJECT.Interface;

namespace PROJECT.Controllers
{
    [Authorize]
    public class DashBoardController : Controller
    {
        private readonly IDashBoardService dashBoardService;

        public DashBoardController(IDashBoardService dashBoardService)
        {
            this.dashBoardService = dashBoardService;
        }

        [HttpGet("/api/male")]
        public IActionResult GetBoys()
        {
            var boys = dashBoardService.TotalBoys();
            return Ok(boys);
        }

        [HttpGet("/api/female")]
        public IActionResult GetGirls()
        {
            var girls = dashBoardService.TotalGirls();
            return Ok(girls);
        }

        [HttpGet("/api/allStudents")]
        public IActionResult GetStudents()
        {
            var student = dashBoardService.AllStudent();
            return Ok(student);
        }

        [HttpGet("/api/allStaff")]
        public IActionResult GetStaffs()
        {
            var staffs = dashBoardService.AllStaff();
            return Ok(staffs);
        }

        [HttpGet("/api/gradeCount")]
        public  IActionResult Grade()
        {
            var grades = dashBoardService.Grages();
            return Ok(grades);
        }

        [HttpGet("/api/staffGenders")]
        public IActionResult StaffGender()
        {
            var genders = dashBoardService.StaffGenders();
            return Ok(genders);
        }

        [HttpGet("/api/GradeMales")]
        public IActionResult GradeMale()
        {
            var gradeMale = dashBoardService.GragesMale();
            return Ok(gradeMale);
        }

        [HttpGet("/api/GradeFemales")]
        public IActionResult GradeFemale()
        {
            var gradeFemale = dashBoardService.GragesFemale();
            return Ok(gradeFemale);
        }
        
    }
}