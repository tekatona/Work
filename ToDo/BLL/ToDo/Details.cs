using CORE;
using DAL;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BLL.ToDo
{
    public class Details
    {
        public class Query : IRequest<TaskToDo>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, TaskToDo>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<TaskToDo> Handle(Query request, CancellationToken cancellationToken = default)
            {
                return await context.TaskToDo.FindAsync(request.Id);
            }
        }
    }
}
