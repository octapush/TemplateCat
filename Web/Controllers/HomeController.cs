// FILENAME    : HomeController.cs
// ==========================================================
//  
// AUTHOR      : FADHLY PERMATA
// CREATED AT  : 2018-07-09
// 
// ==========================================================

#region REFFERENCES

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