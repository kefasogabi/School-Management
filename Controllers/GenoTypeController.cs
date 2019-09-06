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
    [Authorize]
    public class GenoTypeController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GenoTypeController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/genoType")]
        public async Task<IEnumerable<GenoTypeDto>> GetGenoType()
        {
            var geno = await context.GenoTypes.ToListAsync();

            return mapper.Map<List<GenoType>, List<GenoTypeDto>>(geno);
        }
    }
}