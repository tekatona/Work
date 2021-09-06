using CORE;
using DAL;
using System.Linq;

namespace BLL.Authentification
{
    public class Authentification
    {
        private readonly DataContext context;

        public Authentification(DataContext context)
        {
            this.context = context;
        }

        public User CreateUser(User user)
        {
            var userFromDb = context.User.FirstOrDefault(x => x.Login == user.Login);

            if (userFromDb == null)
            {
                context.User.Add(user);

                context.SaveChanges();

                return context.User.FirstOrDefault(x => x.Login == user.Login);
            }

            return null;
        }

        public User LoginUser(User user)
        {
            return context.User.FirstOrDefault(x => x.Login == user.Login && x.Password == user.Password);
        }
    }
}

