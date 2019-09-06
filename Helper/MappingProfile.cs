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
            CreateMap<Student, StudentDto>()
            .ForMember(sd => sd.Terms, opt => opt.MapFrom(s => s.Terms
            .Select(st => new Pair {Id = st.Term.Id, Name = st.Term.Name})))
            .ForMember(sr => sr.Results, opt => opt.MapFrom( r => r.Results
            .Select(rt => new ResultDto { Id = rt.Id, Year = rt.Year, Name = rt.Name, CA1 = rt.CA1, CA2 = rt.CA2, Exam = rt.Exam, StudentId = rt.StudentId })));
            CreateMap<StudentDto, Student>();

             CreateMap<Sex, SexDto>();
             CreateMap<SexDto, Sex>();

            CreateMap<Grade, GradeDto>();
            CreateMap<GradeDto, Grade>();

            CreateMap<ChangePassword, ChangePasswordDto>();
            CreateMap<ChangePasswordDto, ChangePassword>();
            

            CreateMap<Sessions, SessionDto>();
            CreateMap<SessionDto, Sessions>();

            CreateMap<Term, Pair>();
            CreateMap<Pair, Term>();

            CreateMap<StudentTerm, StudentTermDto>();
            CreateMap<StudentTermDto, StudentTerm>();

            CreateMap<TermResult, TermResultDto>();
            CreateMap<TermResultDto, TermResult>();

            CreateMap<Result, ResultDto>();
            CreateMap<ResultDto, Result>();

            CreateMap<BloodGroup, BloodGroupDto>();
            CreateMap<GenoType, GenoTypeDto>();
            CreateMap<Religion, ReligionDto>();
            CreateMap<NextKinRelationship, NextKinRelationshipDto>();
            
        }
        
    }
}