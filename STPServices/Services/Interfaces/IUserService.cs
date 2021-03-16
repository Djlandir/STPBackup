using STPServices.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STPServices.Services.Interfaces
{
    public interface IUserService
    {
        UserDTO Authenticate(string login, string password, string jwtKey);
    }
}
