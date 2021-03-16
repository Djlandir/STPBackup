using System;
using System.Collections.Generic;

#nullable disable

namespace STPDataAccess.Model
{
    public partial class User
    {
        public Guid Id { get; set; }
        public string Vorname { get; set; }
        public string Nachname { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
    }
}
