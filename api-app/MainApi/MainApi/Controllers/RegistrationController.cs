using MainApi.Helpers;
using MainApi.Models.Entities;
using MainApi.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly ApplicationContext context;

        public RegistrationController(ApplicationContext context)
        {
            this.context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post(RequestRegistration request)
        {
            if (await context.Users.AnyAsync(u => u.Name == request.Name))
            {
                return Conflict($"{request.Name} уже есть");
            }

            var roles = new List<UserRole>
            {
                // By default
                new UserRole { Id = Guid.NewGuid(), Name = ApplicationConstants.RoleOther }
            };

            if (request.Is18)
            {
                roles.Add(new UserRole { Id = Guid.NewGuid(), Name = ApplicationConstants.Role18 });
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                PswHash = Md5Helper.Hash(request.Password),
                Registered = DateTime.UtcNow,
                UserRoles = roles
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok(user);
        }
    }
}
