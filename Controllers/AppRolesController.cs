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
    [Route("api/role-data")]
    public class AppRolesController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
       
        public AppRolesController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        //[Route("[action]")]
        [HttpGet]
        public IQueryable<ApplicationUser> GetRoles()
        {
            var x = _userManager.Users;
            return x;
        }

        /*
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> AddBurialData(ApplicationUser newRoleData)
        {
            var userUpdate = new ApplicationUser
            {
                Id = newRoleData.Id,
                UserName = newRoleData.UserName,
                RoleName = newRoleData.RoleName
            };

            _userManager.UserManager<ApplicationUser>.Update(userUpdate);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBurialData), new { id = burialMain.Id }, newBurialData);
        }
        */
    }

}