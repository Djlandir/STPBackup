using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using STPServices.Helpers;
using STPServices.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace STPApi.Helpers
{
    public class GlobalExceptionHandler
    {
        private readonly RequestDelegate _request;
        private readonly ILogger _logger;

        public GlobalExceptionHandler(RequestDelegate request, ILogger logger)
        {
            _request = request;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _request(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError; // 500

            if (ex is NotFoundException || ex is UnauthorizedAccessException)
                code = HttpStatusCode.NotFound; // 404
            else
            {
                _logger.LogError(ex);
            }

            var result = JsonConvert.SerializeObject(new { error = ex.ToString() });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            context.Response.Headers.Clear();
            await context.Response.WriteAsync(result);
        }
    }
}
