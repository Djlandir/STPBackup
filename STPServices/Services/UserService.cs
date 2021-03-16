using Microsoft.IdentityModel.Tokens;
using STPDataAccess.Helpers;
using STPDataAccess.Model;
using STPServices.DTO;
using STPServices.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace STPServices.Services
{
    public class UserService : IUserService
    {
        private readonly STPDBContext _dataContext;

        public UserService(STPDBContext dataContext)
        {
            _dataContext = dataContext;
        }

        public UserDTO Authenticate(string login, string password, string jwtKey)
        {
            var user = _dataContext.Users.SingleOrDefault(x => x.Login == login);
            // Account hinzufügen wenn nicht vorhanden
            if (user == null)
                user = DBInitializer.SeedUserDev(_dataContext, login, password);

            if (user == null)
                return null;

            if (!PasswordHasher.Validate(password, user.PasswordSalt, user.PasswordHash))
                return null;

            // JWT erzeugen
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            UserDTO dto = new UserDTO()
            {
                Id = user.Id,
                FirstName = user.Vorname,
                LastName = user.Nachname,
                Token = tokenHandler.WriteToken(token)
            };

            return dto;
        }
    }
}
