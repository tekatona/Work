using BLL.ToDo;
using CORE;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ToDoController : BaseApiController
    {
        [HttpGet("{user_id}")]
        public async Task<ActionResult<List<TaskToDo>>> GetToDoTasks(int user_id)
        {
            return await Mediator.Send(new ListToDo.Query { User_Id = user_id });
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<TaskToDo>> GetToDoTask(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateToDoTask(TaskToDo task)
        {
            return Ok(await Mediator.Send(new Create.Command { TaskToDo = task }));
        }

        [HttpPut]
        public async Task<IActionResult> EditToDoTask(int id, TaskToDo task)
        {
            task.Id = id;

            return Ok(await Mediator.Send(new Edit.Command { TaskToDo = task }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoTask(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
