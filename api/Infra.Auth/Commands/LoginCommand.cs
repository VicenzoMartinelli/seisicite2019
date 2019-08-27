using Domain.Core.Commands;
using Infra.Auth.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Infra.Auth.Commands
{
  public class LoginCommand : Command<Token>
  {
    [Required(ErrorMessage = "O campo {0} é obrigatório")]
    [EmailAddress(ErrorMessage = "O campo {0} está em formato inválido")]
    public string Email { get; set; }

    [Required(ErrorMessage = "O campo Senha é obrigatório")]
    [StringLength(100, ErrorMessage = "O campo Senha precisa ter entre {2} e {1} caracteres", MinimumLength = 6)]
    public string Password { get; set; }
  }
}
