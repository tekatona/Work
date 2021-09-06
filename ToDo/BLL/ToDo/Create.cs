using CORE;
using DAL;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BLL.ToDo
{
    public class Create
    {
        public class Command : IRequest
        {
            public TaskToDo TaskToDo { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                context.TaskToDo.Add(request.TaskToDo);

                context.SaveChanges();

                return Unit.Value;
            }
        }
    }
}
