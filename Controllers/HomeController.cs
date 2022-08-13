using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Rocket_Elevators_Customer_Portal.Models;
using Microsoft.AspNetCore.Identity;


namespace Rocket_Elevators_Customer_Portal.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult Intervention()
    {
        if (User?.Identity.IsAuthenticated == true){

            return View();
        }

        return View("Index");
    }

    public IActionResult Product()
    {
         if (User?.Identity.IsAuthenticated == true){
            return View();
        }
        
        return View("index");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
gi