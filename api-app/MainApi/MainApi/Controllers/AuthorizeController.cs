using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MainApi.Helpers;
using MainApi.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorizeController : ControllerBase
    {
        private readonly IConfiguration configuration;

        private readonly ApplicationContext context;

        public AuthorizeController(IConfiguration configuration, ApplicationContext context)
        {
            this.configuration = configuration;
            this.context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post(RequestAuthorization request)
        {
            var user = await context.Users
                            .Include(u => u.UserRoles)
                            .SingleOrDefaultAsync(u => u.Name == request.Name && u.PswHash == Md5Helper.Hash(request.Password));

            if (user is not null)
            {
                var issuer = configuration["Jwt:Issuer"] ?? "default";
                var audience = configuration["Jwt:Audience"] ?? "default";
                var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"] ?? ApplicationConstants.JwtKey);

                var claims = new ClaimsIdentity(new[]
                    {
                        new Claim("Id", Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                        new Claim(JwtRegisteredClaimNames.Email, user.Name),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                     });

                foreach (var role in user.UserRoles)
                {
                    claims.AddClaim(new Claim(ClaimTypes.Role, role.Name));
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);
                var stringToken = tokenHandler.WriteToken(token);

                return Ok(new
                {
                    UserName = user.Name,
                    Roles = user.UserRoles.Select(r => r.Name),
                    AccessToken = stringToken
                });
            }

            return Unauthorized();

            throw new NotImplementedException();
        }
    }
}
