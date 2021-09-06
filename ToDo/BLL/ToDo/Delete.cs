using DAL;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BLL.ToDo
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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
                var task = await context.TaskToDo.FindAsync(request.Id);

                context.Remove(task);

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
