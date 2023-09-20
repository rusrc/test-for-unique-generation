using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContentController : ControllerBase
    {
        [Authorize(Roles = "other")]
        [HttpGet("for-other")]
        public async Task<IActionResult> forOther()
        {
            return Ok(new
            {
                Message = "Has one role only"
            });
        }

        [Authorize(Roles = "18+")]
        [HttpGet("for-18")]
        public async Task<IActionResult> for18()
        {
            return Ok(new
            {
                Message = "Has both roles"
            });
        }
    }
}
