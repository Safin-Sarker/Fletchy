using System;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
  [HttpPost("register")]
  public async Task<ActionResult> Register(RegisterDto registerDto)
  {
    var user = new User
    {
      UserName = registerDto.Email,
      Email = registerDto.Email
    };

    var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

    if (!result.Succeeded)
    {
      foreach (var error in result.Errors)
      {
        ModelState.AddModelError(error.Code, error.Description);
      }

      return ValidationProblem();
    }

    await signInManager.UserManager.AddToRoleAsync(user, "Member");

    return Ok();


  }




  [HttpGet("user-info")]
  public async Task<ActionResult> GetUserInfo()
  {

    if (User.Identity?.IsAuthenticated != true) return NoContent();

    var user = await signInManager.UserManager.GetUserAsync(User);

    if (user == null) return Unauthorized();

    var roles = await signInManager.UserManager.GetRolesAsync(user);

    return Ok(new
    {
      user.Email,
      user.UserName,
      Roles = roles.ToList()
    });
  }

  [HttpPost("logout")]
  public async Task<ActionResult> Logout()
  {
    await signInManager.SignOutAsync();
    return Ok();
  }


  [Authorize]
  [HttpPost("address")]
  public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
  {
    var user = await signInManager.UserManager.Users.Include(u => u.Address)
      .FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);

    if (user == null) return Unauthorized();

    user.Address = address;

    var result = await signInManager.UserManager.UpdateAsync(user);

    if (result.Succeeded) return Ok(user.Address);

    return BadRequest("Problem updating user address");
  }

  [Authorize]
  [HttpGet("address")]
  public async Task<ActionResult<Address>> GetSavedAddress()
  {
    var user = await signInManager.UserManager.Users.Include(u => u.Address)
      .FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);

    if (user == null) return NoContent();

    return Ok(user.Address);
  }

}
