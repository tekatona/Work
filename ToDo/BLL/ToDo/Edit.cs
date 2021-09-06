using AutoMapper;
using CORE;
using DAL;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BLL.ToDo
{
    public class Edit
    {
        public class Command : IRequest
        {
            public TaskToDo TaskToDo { get; set; }

            public class Handler : IRequestHandler<Command>
            {
                private readonly DataContext context;
                private readonly IMapper mapper;

                public Handler(DataContext context, IMapper mapper)
                {
                    this.context = context;
                    this.mapper = mapper;
                }

                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {
                    var task = await context.TaskToDo.FindAsync(request.TaskToDo.Id);

                    mapper.Map(request.TaskToDo, task);

                    context.SaveChanges();

                    return Unit.Value;
                }
            }
        }
    }
}
