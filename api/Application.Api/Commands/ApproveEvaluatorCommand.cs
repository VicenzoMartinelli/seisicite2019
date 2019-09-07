using Domain.Core.Commands;
using System.ComponentModel.DataAnnotations;

namespace Services.Seisicite.Api.Commands
{
  public class ApproveEvaluatorCommand : Command<bool>
  {
    [Required(ErrorMessage = "O campo {0} é obrigatório")]
    public string UserId { get; set; }
  }
}
