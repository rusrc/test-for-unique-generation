using Microsoft.AspNetCore.Mvc;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ApplicationContext context;

        public TestController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(context.Users);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            return Ok(context.UserRoles);
        }
    }
}
