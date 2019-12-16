using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Dto;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Controllers
{
    [Authorize]
    public class ResultController : Controller
    {
        private readonly IResultService resultService;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
      

        public ResultController(IResultService resultService, IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.resultService = resultService;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            
            
        }

        [Authorize(Roles = RoleName.Admin)]
        [HttpPost("/api/PostStudentTerm")]
        public async Task<IActionResult> PostStudentTerm([FromBody] StudentTermDto studentTermDto)
        {
            var studentTerm = mapper.Map<StudentTerm>(studentTermDto);

            try
            {
                resultService.Create(studentTerm);

                await unitOfWork.CompleteAsync();

                return Ok(studentTerm);
            }
             catch(ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        
        [HttpPost("/api/PostResult")]
        public async Task<IActionResult> PostResult([FromBody] ResultDto resultDto)
        {
            var result = mapper.Map<Result>(resultDto);

            try
            {
                resultService.Save(result);
                await unitOfWork.CompleteAsync();

                return Ok(result);
            }
            catch(ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("/api/updateresult/{id}")]
        public async Task<IActionResult> UpdateResult(int id, [FromBody] ResultDto resultDto)
        {
            var result = mapper.Map<Result>(resultDto);

            try{
                resultService.Update(result);
                await unitOfWork.CompleteAsync();
                return Ok();
            }
            catch(ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/api/getresult/{id}")]
        public IActionResult GetById(int id)
        {
            var result = resultService.GetById(id);
            var resultDto = mapper.Map<ResultDto>(result);
            return Ok(resultDto);
        }

        [HttpDelete("/api/deleteresult/{id}")]
        public  async Task<IActionResult> DeleteResult(int id)
        {
            resultService.Delete(id);
            await unitOfWork.CompleteAsync();
            return Ok(id);
        }

        [HttpGet("/api/Getstudent/{name}")]
        public async Task<IActionResult> GetStudent(string name)
        {
            var student = await resultService.GetStudent(name);
            if(student == null)
                return NotFound("User Not Found");
            
            var studentDto = mapper.Map<StudentDto>(student);
            return Ok(studentDto);
        }

            // [HttpGet("")]
            // public async Task<IActionResult> GetUserResult(Result result)
            // {
            //     var results = await resultService.GetUserResult(result);
            //     var Dto = mapper.Map<StudentDto>(results);
            //     return Ok();
            // }

        
    }
}