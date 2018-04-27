using System.Linq;
using System.Web.Http;

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
                    item: config
                        .Formatters
                        .XmlFormatter
                        .SupportedMediaTypes
                        .FirstOrDefault(predicate: t => t.MediaType == "application/xml")
                );


            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "ApiById",
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional,},
                constraints: new {id = @"^[0-9]+$"}
            );

            config.Routes.MapHttpRoute(
                name: "ApiByName",
                routeTemplate: "api/{controller}/{action}/{name}",
                defaults: null,
                constraints: new {name = @"^[a-z]+$"}
            );

            config.Routes.MapHttpRoute(
                name: "ApiByAction",
                routeTemplate: "api/{controller}/{action}",
                defaults: new {action = "Get"}
            );

            config.Routes.MapHttpRoute(
                name: "ActionApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new {id = RouteParameter.Optional}
            );
            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);
        }
    }
}
