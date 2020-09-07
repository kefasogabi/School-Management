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
    public class BloodGroupController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public BloodGroupController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/bloodGroup")]
        public async Task<IEnumerable<BloodGroupDto>> GetBloodGroup()
        {
            var blood = await context.BloodGroups.ToListAsync();
            return mapper.Map<List<BloodGroup>, List<BloodGroupDto>>(blood);
        }
    }
}