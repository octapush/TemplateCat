#region File Information

// SolutionName  : PlnScatter
// ProjectName   : PlnScatter.Web
// FileName      : HomeController.cs
// ======================================
// Author        : Fadhly Permata
// CreatedAt     : 2018-03-23 [15:10]
// ModifiedAt    : 2018-04-11 [15:23]

#endregion

#region Refference

using System.Web.Mvc;
using System.Web.UI;

#endregion

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult Index()
        {
            return View();
            //return RedirectToAction("Index", "Dashboard");
        }
    }
}