using System;
using System.Web.Http;
using Web.Utilities;

namespace Web.Api
{
    public class FileReaderController : ApiController
    {
        public IHttpActionResult Get([FromUri] string subPath)
        {
            try
            {
                return Ok(new {output = AppSettings.ReadTextFile(subPath)});
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }
    }
}
