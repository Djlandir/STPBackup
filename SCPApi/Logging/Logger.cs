using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using STPServices.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace STPApi.Logging
{
    public class Logger : ILogger
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IServiceProvider _serviceProvider;

        public Logger(IWebHostEnvironment hostingEnvironment, IServiceProvider serviceProvider)
        {
            _hostingEnvironment = hostingEnvironment;
            _serviceProvider = serviceProvider;
        }

        public void LogError(Exception ex)
        {
            try
            {
                string logFilePath = Path.Combine(_hostingEnvironment.ContentRootPath, "ErrorLog", "Errors.txt");
                File.AppendAllText(logFilePath, ex.ToString());
            }
            catch (Exception)
            {
                // not possible
            }

            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
#warning TODO Logging
                    //var dataContext = scope.ServiceProvider.GetRequiredService<LBDBContext>();


                    //_dataContext.LogEntries.Add(new VINDataAccess.Model.LogEntry()
                    //{
                    //    Exception = ex.ToString(),
                    //    Message = ex.Message,
                    //    Date = DateTime.Now.ToString(),
                    //    Level = "Error",
                    //    Logger = "VINApi.Logging.Logger",
                    //    StackTrace = ex.StackTrace,
                    //    Thread = Thread.CurrentThread.Name,
                    //    Username = _userProvider.GetCurrentUserId().ToString(),
                    //    MachineName = Environment.MachineName,
                    //    CallSite = new StackFrame(1).GetMethod().Name

                    //});
                    //_dataContext.SaveChanges();
                }
            }
            catch (Exception)
            {
                // not possible
            }
        }
    }
}
