using CORE;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<TaskToDo> TaskToDo { get; set; }

        public DbSet<User> User { get; set; }
    }
}
