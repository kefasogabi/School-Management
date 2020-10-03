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
    
    public class GradeController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        public GradeController(ApplicationDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet("/api/grade")]
        public async Task<IEnumerable<GradeDto>> GetClass()
        {
            var grade = await context.Grade.Include(c => c.Students)
                                            .ThenInclude( c => c.Sex)
                                            .Include(x =>x.Students)
                                            .ThenInclude(c => c.Grade)
                                            .Include(x =>x.Students)
                                            .ThenInclude(c => c.BloodGroup)
                                            .Include(x =>x.Students)
                                            .ThenInclude(c => c.GenoType)
                                            .Include(x =>x.Students)
                                            .ThenInclude(c => c.Religion)
                                            .Include(x =>x.Students)
                                            .ThenInclude(c => c.Session).ToListAsync();
            return mapper.Map<List<Grade>, List<GradeDto>>(grade);
        } 
    }
}