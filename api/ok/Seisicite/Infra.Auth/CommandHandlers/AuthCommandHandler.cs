using Domain.Core.Enumerators;
using Domain.Core.Notifications;
using Infra.Auth.Commands;
using Infra.Auth.Configuration;
using Infra.Data.MongoIdentityStore;
using Infra.Data.MongoIdentityStore.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Infra.Auth.CommandHandlers
{
  public class AuthCommandHandler : IRequestHandler<RegisterUserCommand, Token>, IRequestHandler<LoginCommand, Token>
  {
    private readonly UserManager<MongoIdentityUser> _userManager;
    private readonly SignInManager<MongoIdentityUser> _signInManager;
    private readonly SecuritySettings _secSettings;
    private readonly NotificationContext _notificationContext;

    public AuthCommandHandler(
      UserManager<MongoIdentityUser> userManager,
      SignInManager<MongoIdentityUser> signInManager,
      SecuritySettings secSettings,
      NotificationContext notificationContext  
    )
    {
      _userManager         = userManager;
      _signInManager       = signInManager;
      _secSettings         = secSettings;
      _notificationContext = notificationContext;
    }

    public async Task<Token> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
      var user = new MongoIdentityUser(request.Email, request.Email);

      user.AddClaim(new MongoUserClaim("Email", request.Email));

      var result = await _userManager.CreateAsync(user, request.Password);

      if (!result.Succeeded)
      {
        foreach (var er in result.Errors.Select(x => Convert.ToInt32(x.Code)))
        {
          _notificationContext.PushNotification((ReturnCode) er);
        }
        return null;
      }

      await _signInManager.SignInAsync(user, false);

      return await GerarJwt(user.Email.Value);
    }

    public async Task<Token> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
      if (cancellationToken.IsCancellationRequested)
        return default;

      var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, false, true);

      if (!result.Succeeded)
      {
        if (result.IsLockedOut)
          _notificationContext.PushNotification(ReturnCode.UsuarioBloqueado);
        else
          _notificationContext.PushNotification(ReturnCode.DadosDeLoginInvalidos);

        return default;
      }

      return await GerarJwt(request.Email);
    }

    private async Task<Token> GerarJwt(string username)
    {
      var user = await _userManager.FindByNameAsync(username);

      var identityClaims = new ClaimsIdentity();

      identityClaims.AddClaims(await _userManager.GetClaimsAsync(user));

      var tokenHandler = new JwtSecurityTokenHandler();
      var key          = Encoding.ASCII.GetBytes(_secSettings.Secret);
      var created      = DateTime.UtcNow;
      var valid        = created.AddHours(_secSettings.DurationHours);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject            = identityClaims,
        Issuer             = _secSettings.Issuer,
        Expires            = valid,
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };

      return new Token()
      {
        Created     = created.ToString(),
        Expiration  = valid.ToString(),
        AccessToken = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor))
      };
    }
  }
}
