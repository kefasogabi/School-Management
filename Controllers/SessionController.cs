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
    [Authorize]
    public class SessionController : Controller
    {
        private readonly ISessionService sessionService;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public SessionController(ISessionService sessionService, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.sessionService = sessionService;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("/api/sessions")]
        public IActionResult GetAll()
        {
            var session = sessionService.GetAll();
            var sessionDto = mapper.Map<IList<SessionDto>>(session);
            return Ok(sessionDto);
        }

        [HttpGet("/api/getSession/{id}")]
        public IActionResult GetById(int id)
        {
            var session = sessionService.GetById(id);
            var sessionDto = mapper.Map<SessionDto>(session);
            return Ok(sessionDto);
        }

        [HttpPost("/api/postSession")]
        public async Task<IActionResult> Create([FromBody]SessionDto sessionDto)
        {
           
            var session = mapper.Map<Sessions>(sessionDto);

            try
            {
                sessionService.Create(session);
                await unitOfWork.CompleteAsync();

                return Ok(session);
            }
            catch(ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("/api/deleteSession/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            sessionService.Delete(id);
            await unitOfWork.CompleteAsync();
            return Ok(id);
        }

        [HttpPut("/api/updateSession/{id}")]

        public async Task<IActionResult> Update(int id, [FromBody] SessionDto sessionDto)
        {
            var session = mapper.Map<Sessions>(sessionDto);
            try{
                    sessionService.Update(session);
                    await unitOfWork.CompleteAsync();
                    return Ok();
            }
            catch(ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}