using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Dto;
using PROJECT.Helper;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Controllers
{
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
             catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        
        [HttpPost("/api/PostResult")]
        public async Task<IActionResult> PostResult([FromBody] List<ResultDto> resultDto)
        {
            var result = mapper.Map<List<Result>>(resultDto);

            try
            {
                resultService.Save(result);
                await unitOfWork.CompleteAsync();  
            }
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(result);
        }

        [HttpPut("/api/updateresult/{id}")]
        public async Task<IActionResult> UpdateResult(int id, [FromBody]ResultDto resultDto)
        {
            var result = mapper.Map<Result>(resultDto);
                result.Id = id; 

            try{
                resultService.Update(result);
                await unitOfWork.CompleteAsync();
                
            }
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpGet("/api/getresult/{id}")]
        public IActionResult GetById(int id)
        { 
            var res = new ResultDto();

            try
            {
                var result = resultService.GetById(id);
                res = mapper.Map<ResultDto>(result);
            }
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
           
            return Ok(res);
        }

        [HttpDelete("/api/deleteresult/{id}")]
        public  async Task<IActionResult> DeleteResult(int id)
        {
            try{
                 resultService.Delete(id);
                await unitOfWork.CompleteAsync();
            }
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
           
            return Ok(id);
        }

        [HttpGet("/api/Getstudent/{name}")]
        public async Task<IActionResult> GetStudent(string name)
        {
            var res = new StudentDto();

            try{
                 var student = await resultService.GetStudent(name);
                if(student == null)
                    return NotFound("User Not Found");
                
                res = mapper.Map<StudentDto>(student);
            }
            catch(AppException ex)
            {
                return BadRequest(ex.Message);
            }
           
            return Ok(res);
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