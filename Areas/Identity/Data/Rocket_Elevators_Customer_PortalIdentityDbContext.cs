using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Rocket_Elevators_Customer_Portal.Areas.Identity.Data;

public class Rocket_Elevators_Customer_PortalIdentityDbContext : IdentityDbContext<IdentityUser>
{
    public Rocket_Elevators_Customer_PortalIdentityDbContext(DbContextOptions<Rocket_Elevators_Customer_PortalIdentityDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);
    }
}
