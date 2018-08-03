// FILENAME    : AppSettings.cs
// ==========================================================
//  
// AUTHOR      : FADHLY PERMATA
// CREATED AT  : 2018-07-09
// 
// ==========================================================

#region REFFERENCES

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