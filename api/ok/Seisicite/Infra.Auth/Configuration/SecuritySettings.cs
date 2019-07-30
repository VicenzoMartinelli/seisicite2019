using System;
using System.Collections.Generic;
using System.Text;

namespace Infra.Auth.Configuration
{
  public class SecuritySettings
  {
    public string Secret { get; set; }
    public int DurationHours { get; set; }
    public string Issuer { get; set; }
  }
}
