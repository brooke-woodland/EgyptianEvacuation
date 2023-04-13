using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using intexxxx.Data;
using intexxxx.Models;

namespace intexxxx.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppRolesController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
       
        public AppRolesController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [Route("[action]")]
        [HttpGet]
        public IQueryable<ApplicationUser> GetRoles()
        {
            var x = _userManager.Users;
            return x;
        }

    }

}