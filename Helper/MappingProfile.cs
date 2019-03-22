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
            

            CreateMap<Sessions, SessionDto>();
            CreateMap<SessionDto, Sessions>();

            CreateMap<Term, TermDto>();
            CreateMap<TermDto, Term>();

            CreateMap<BloodGroup, BloodGroupDto>();
            CreateMap<GenoType, GenoTypeDto>();
            CreateMap<Religion, ReligionDto>();
            CreateMap<NextKinRelationship, NextKinRelationshipDto>();

            
        }
        
    }
}