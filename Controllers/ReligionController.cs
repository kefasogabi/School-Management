using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJECT.Dto;
using PROJECT.Models;

namespace PROJECT.Controllers
{
    public class ReligionController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ReligionController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/religion")]
        public async Task<IEnumerable<ReligionDto>> GetReligion()
        {
           var religion = await context.Religions.ToListAsync();

            return mapper.Map<List<Religion>, List<ReligionDto>>(religion);
        }
    }
}