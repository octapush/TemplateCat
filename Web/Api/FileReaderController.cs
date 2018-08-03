// FILENAME    : FileReaderController.cs
// ==========================================================
//  
// AUTHOR      : FADHLY PERMATA
// CREATED AT  : 2018-07-09
// 
// ==========================================================

#region REFFERENCES

using System;
using System.Web.Http;
using Web.Utilities;

#endregion

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