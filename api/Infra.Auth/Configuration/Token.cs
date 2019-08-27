using System;
using System.Collections.Generic;
using System.Text;

namespace Infra.Auth.Configuration
{
  public class Token
  {
    public string Created { get; set; }
    public string Expiration { get; set; }
    public string AccessToken { get; set; }
  }
}
