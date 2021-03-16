using STPDataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STPDataAccess.Helpers
{
    public static class DBInitializer
    {
        public static User SeedUserDev(STPDBContext dataContext, string userName, string password)
        {
            if (userName == "testAdmin" && password == "test")
                return CreateUserDev(dataContext, "Christian", "Bale", userName, password);
            else if (userName == "testUser1" && password == "test")
                return CreateUserDev(dataContext, "Adam", "West", userName, password);
            else if (userName == "testUser2" && password == "test")
                return CreateUserDev(dataContext, "Val", "Kilmer", userName, password);
            else if (userName == "testUser3" && password == "test")
                return CreateUserDev(dataContext, "George", "Clooney", userName, password);
            else if (userName == "testUser4" && password == "test")
                return CreateUserDev(dataContext, "Micheal", "Keaton", userName, password);
            else if (userName == "testUser5" && password == "test")
                return CreateUserDev(dataContext, "Ben", "Affleck", userName, password);

            return null;
        }

        private static User CreateUserDev(STPDBContext dataContext, string firstName, string lastName, string login, string password)
        {
            User newUser = new User
            {
                Id = Guid.NewGuid(),
                Login = login,
                Vorname = firstName,
                Nachname = lastName,
                PasswordSalt = PasswordHasher.GetSalt()
            };

            newUser.PasswordHash = PasswordHasher.CreatePasswordHash(password, newUser.PasswordSalt);
            dataContext.Users.Add(newUser);
            dataContext.SaveChanges();

            return newUser;
        }
    }
}
