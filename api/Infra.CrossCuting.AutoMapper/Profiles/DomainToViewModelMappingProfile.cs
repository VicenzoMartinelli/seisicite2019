using AutoMapper;
using System;

namespace Infra.CrossCuting.AutoMapper.Profiles
{
  public class DomainToViewModelMappingProfile : Profile
  {
    public DomainToViewModelMappingProfile()
    {
      //CreateMap<Alunos, RegisterNewAlunosCommand>()
      //    .IgnoreAllPropertiesWithAnInaccessibleSetter();
    }
  }
}
