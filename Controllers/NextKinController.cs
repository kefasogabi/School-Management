using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.Dto;
using PROJECT.Models;

namespace PROJECT.Controllers
{
    
    public class NextKinController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public NextKinController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/nextKin")]
        public async Task<IEnumerable<NextKinRelationshipDto>> getNextKin()
        {
            var next = await context.NextKinRelationship.ToListAsync();
            return mapper.Map<List<NextKinRelationship>, List<NextKinRelationshipDto>>(next);
        }
        
    }
}