using intexxxx.Data;
using intexxxx.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Net;
using System.Security.Cryptography;

namespace intexxxx
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(
                    Configuration.GetConnectionString("DefaultConnection")));

            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();


            services.AddCors(options => 
                {
                    options.AddPolicy("CorsPolicy", builder =>
                        {
                            builder.WithOrigins("https://localhost:44363", "http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
    
                        });
                    });

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddControllersWithViews();
            services.AddRazorPages();

            services.AddHsts(options =>
            {
                options.IncludeSubDomains = true;
                options.MaxAge = TimeSpan.FromDays(60);
            });

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = (int)HttpStatusCode.TemporaryRedirect;
                options.HttpsPort = 5001;
            });

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequiredLength = 14;
                options.Password.RequiredUniqueChars = 5;
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var env_status = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            Console.WriteLine($"ASPNETCORE_ENVIRONMENT={env_status}");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //This also allows us to redirect HTTP to HTTPS in production
            /*if (!env.IsDevelopment())
            {
                services.AddHttpsRedirection(options =>
                {
                    options.RedirectStatusCode = (int)HttpStatusCode.PermanentRedirect;
                    options.HttpsPort = 443;
                });
            }*/

            /*if (genericPrincipal.IsInRole("NetworkUser"))
            {
                Console.WriteLine("User belongs to the NetworkUser role.");
            }*/

            //This Redirects Http to Https
            //app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCookiePolicy();

            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            //This sets ups the CSP Header
            app.Use(async (context, next) => {


                context.Response.Headers.Add("Content-Security-Policy", 
                    "default-src 'self'; " +
                    "connect-src 'self' https://mummysupervised23.is404.net/predict-wrapping https://mummysupervised23.is404.net/predict-head-direction wss://localhost:2346/ws unsafe-inline; " +
                    "script-src 'self' cdn.jsdelivr.net; " +
                    "style-src 'self' stackpath.bootstrapcdn.com maxcdn.bootstrapcdn.com 'unsafe-inline'; " +
                    "font-src 'self' maxcdn.bootstrapcdn.com; img-src 'self'; frame-src 'self'");

                await next();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            env_status = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            Console.WriteLine($"ASPNETCORE_ENVIRONMENT={env_status} right before UseSpa");
            app.UseSpa(spa =>
            {

                spa.Options.SourcePath = "ClientApp";

                //spa.UseReactDevelopmentServer(npmScript: "start");

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
