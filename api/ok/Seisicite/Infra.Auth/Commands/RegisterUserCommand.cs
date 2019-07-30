using Domain.Core.Commands;
using Infra.Auth.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Infra.Auth.Commands
{
  public class RegisterUserCommand : Command<Token>
  {
    [Required(ErrorMessage = "O campo {0} é obrigatório")]
    [EmailAddress(ErrorMessage = "O campo {0} está em formato inválido")]
    public string Email { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório")]
    [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 6)]
    public string Password { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório")]
    [StringLength(9, MinimumLength = 1, ErrorMessage = "O campo {0} está em um formato inválido")]
    [RegularExpression("(-?[0-9]+)", ErrorMessage = "O campo {0} precisa ser um valor numérico")]
    public string CodCliSponte { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório")]
    public string TokenWSAPIEdu { get; set; }
  }
}
