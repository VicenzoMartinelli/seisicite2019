﻿using Microsoft.AspNetCore.Hosting;
using System;

namespace Seisicite.Api.Extensions
{
  public static class WebHostBuilderExtensions
  {
    public static IWebHostBuilder UsePort(this IWebHostBuilder builder)
    {
      var port = Environment.GetEnvironmentVariable("PORT");

      if(string.IsNullOrEmpty(port))
      {
        return builder;
      }

      return builder.UseUrls($"https://+:{port}");
    }
  }
}
