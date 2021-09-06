using System.ComponentModel.DataAnnotations;

namespace CORE
{
    public class User
    {
        public int Id { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }
    }
}
