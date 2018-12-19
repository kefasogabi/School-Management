using System.Linq;
using AutoMapper;
using PROJECT.Dto;
using PROJECT.Models;

namespace PROJECT.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Student, StudentDto>();
            CreateMap<StudentDto, Student>();

             CreateMap<Sex, SexDto>();
             CreateMap<SexDto, Sex>();

            CreateMap<Grade, GradeDto>();
            CreateMap<GradeDto, Grade>();

            CreateMap<ChangePassword, ChangePasswordDto>();
            CreateMap<ChangePasswordDto, ChangePassword>();


            
        }
        
    }
}