#region File Information

// SolutionName  : PlnScatter
// ProjectName   : PlnScatter.Web
// FileName      : AppSettings.cs
// ======================================
// Author        : Fadhly Permata
// CreatedAt     : 2018-03-23 [15:04]
// ModifiedAt    : 2018-04-11 [15:23]

#endregion

#region Refference

using System.IO;
using System.Web;
using Newtonsoft.Json.Linq;

#endregion

namespace Web.Utilities
{
    public static class AppSettings
    {
        public static string ReadTextFile(string subPath)
        {
            return File.ReadAllText(BuildAppDataPath(subPath));
        }

        public static dynamic GetSettings()
        {
            var sBuff = ReadTextFile("settings.json");
            return JObject.Parse(sBuff);
        }

        public static string BuildAppDataPath(string subPath)
        {
            return HttpContext.Current.Server.MapPath($"~/App_Data/{subPath}");
        }
    }
}