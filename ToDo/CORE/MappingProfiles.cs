using AutoMapper;

namespace CORE
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<TaskToDo, TaskToDo>();

            CreateMap<User, User>();
        }
    }
}
