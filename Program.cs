using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Rocket_Elevators_Customer_Portal.Areas.Identity.Data;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("Rocket_Elevators_Customer_PortalIdentityDbContextConnection") ?? throw new InvalidOperationException("Connection string 'Rocket_Elevators_Customer_PortalIdentityDbContextConnection' not found.");

var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));

builder.Services.AddDbContext<Rocket_Elevators_Customer_PortalIdentityDbContext>(options =>
    options.UseMySql(connectionString, serverVersion));
    

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<Rocket_Elevators_Customer_PortalIdentityDbContext>();

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (!app.Environment.IsDevelopment())
// {
    // app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    // app.UseHsts();
// }

app.UseDeveloperExceptionPage();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();;
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

app.Run();
