using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using STPApi.Helpers;
using STPServices.DTO;
using STPServices.Services.Interfaces;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STPApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly AppSettings _appSettings;

        public UserController(IUserService userService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        [SwaggerOperation(OperationId = "Users_Authenticate")]
        public ActionResult<UserDTO> Authenticate(string userName, string password)
        {
            var user = _userService.Authenticate(userName, password, _appSettings.Secret);

            if (user == null)
                return Unauthorized(new { message = "Username or password is incorrect." });

            return Ok(user);
        }
    }
}
