using AutoMapper;

namespace Infra.CrossCuting.AutoMapper.Profiles
{
  public class ViewModelToDomainMappingProfile : Profile
  {
    public ViewModelToDomainMappingProfile()
    {
      //CreateMap<RegisterNewAlunosCommand, Alunos>()
      //    .IgnoreAllPropertiesWithAnInaccessibleSetter();
      //CreateMap<AlunosViewModel, Alunos>()
      //    .IgnoreAllPropertiesWithAnInaccessibleSetter()
      //    .ForMember(x => x.Sexo, cfg => cfg.MapFrom(o => o.Sexo.ToString()));
      //CreateMap<UpdateAlunosCommand, Alunos>()
      //    .IgnoreAllPropertiesWithAnInaccessibleSetter();

      //CreateMap<RegisterNewMidiaCommand, Midias>();
      //CreateMap<UpdateMidiaCommand, Midias>();
    }
  }
}
