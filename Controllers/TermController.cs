using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJECT.Dto;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Controllers
{
    public class TermController : Controller
    {
        private readonly ITermService termService;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public TermController(ITermService termService, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.termService = termService;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("/api/terms")]
        public async Task<IActionResult> GetAll()
        {
            var term = await termService.GetAllAsync();
            var termDto = mapper.Map<IList<Pair>>(term);
            return Ok(termDto); 
        }


        [HttpGet("/api/term/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var term = await termService.GetByIdAsync(id);

            var termDto = mapper.Map<Pair>(term);
            return Ok(termDto);
        }

        [Authorize(Roles = RoleName.Admin)]
        [HttpPost("/api/postTerm")]
        public async Task<IActionResult> Create([FromBody] Pair termDto)
        {
            var term = mapper.Map<Term>(termDto);

            try{
                termService.Create(term);

                await unitOfWork.CompleteAsync();

                return Ok(term);

            }
            catch(ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = RoleName.Admin)]
        [HttpPut("/api/updateTerm/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Pair termDto)
        {
            var term = mapper.Map<Term>(termDto);

            try{
                termService.Update(term);

                await unitOfWork.CompleteAsync();

                return Ok(term);
            }
            catch(ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = RoleName.Admin)]
        [HttpDelete("/api/deleteTerm/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            termService.Delete(id);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        
    }
}