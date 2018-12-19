using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.Dto;
using PROJECT.Models;

namespace PROJECT.Controllers
{
    public class SexController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        public SexController(ApplicationDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet("/api/sex")]
        public async Task<IEnumerable<SexDto>> GetSex()
        {
            var sex = await context.Sex.ToListAsync();

            return mapper.Map<List<Sex>, List<SexDto>>(sex);
        }
    }
}