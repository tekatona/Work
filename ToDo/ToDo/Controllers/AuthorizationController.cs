using BLL.Authentification;
using CORE;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AuthorizationController : BaseApiController
    {
        private readonly Authentification auth;

        public AuthorizationController(Authentification auth)
        {
            this.auth = auth;
        }

        [HttpPost("Login/")]
        public User LoginUser(User user)
        {
            return auth.LoginUser(user);
        }

        [HttpPost("Registration/")]
        public User CreateUser(User user)
        {
            return auth.CreateUser(user);
        }
    }
}
