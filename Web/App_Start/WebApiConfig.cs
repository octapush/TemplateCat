// FILENAME    : WebApiConfig.cs
// ==========================================================
//  
// AUTHOR      : FADHLY PERMATA
// CREATED AT  : 2018-07-09
// 
// ==========================================================

#region REFFERENCES

using System.Linq;
using System.Web.Http;

#endregion

namespace Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config
                .Formatters
                .XmlFormatter
                .SupportedMediaTypes
                .Remove(
                    config
                        .Formatters
                        .XmlFormatter
                        .SupportedMediaTypes
                        .FirstOrDefault(t => t.MediaType == "application/xml")
                );


            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                "ApiById",
                "api/{controller}/{id}",
                new {id = RouteParameter.Optional},
                new {id = @"^[0-9]+$"}
            );

            config.Routes.MapHttpRoute(
                "ApiByName",
                "api/{controller}/{action}/{name}",
                null,
                new {name = @"^[a-z]+$"}
            );

            config.Routes.MapHttpRoute(
                "ApiByAction",
                "api/{controller}/{action}",
                new {action = "Get"}
            );

            config.Routes.MapHttpRoute(
                "ActionApi",
                "api/{controller}/{action}/{id}",
                new {id = RouteParameter.Optional}
            );


            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);
        }
    }
}