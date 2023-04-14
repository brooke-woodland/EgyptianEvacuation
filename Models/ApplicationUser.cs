using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace intexxxx.Models
{
    public class ApplicationUser : IdentityUser
    {
        //public int? RoleID { get; set; }
        public string RoleName { get; set; }
    }
}
