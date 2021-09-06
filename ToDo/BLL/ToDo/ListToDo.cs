using CORE;
using DAL;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace BLL.ToDo
{
    public class ListToDo
    {
        public class Query : IRequest<List<TaskToDo>> 
        {
            public int User_Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, List<TaskToDo>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<TaskToDo>> Handle(Query request, CancellationToken cancellationToken = default)
            {
                return await context.TaskToDo.Where(x => x.User_ID == request.User_Id).ToListAsync();
            }
        }

    }
}
