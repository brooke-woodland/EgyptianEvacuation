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
        public void ConfigureServices(IServiceCollection services) //IWebHostEnvironment env
        {
            var authConnectString = Configuration["ConnectionStrings:AuthLink"];
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(authConnectString));

            var conectionString = Configuration["ConnectionStrings:DefaultConnection"];
            services.AddDbContext<postgresContext>(options =>
                  options.UseNpgsql(conectionString));

            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();


            services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy", builder =>
                        {
                            builder.WithOrigins("https://localhost:44363", "http://localhost:3000", "http://mummy23.is404.net/.well-known/openid-configuration'.")
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

            //This also allows us to redirect HTTP to HTTPS in production
            /*
            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = (int)HttpStatusCode.PermanentRedirect;
                options.HttpsPort = 443;
            });
            */
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

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

            ////This sets ups the CSP Header
            app.Use(async (context, next) =>
            {


                context.Response.Headers.Add("Content-Security-Policy",
                    "default-src 'self'; " +
                    "connect-src 'self' cdn.jsdelivr.net http://mummy23.is404.net/.well-known/openid-configuration https://is404.net mummysupervised23.is404.net/predict-wrapping mummysupervised23.is404.net/predict-head-direction wss://localhost:2346/ws unsafe-inline mummy23.is404.net/.well-known/openid-configuration localhost:5001/approles/GetRoles' ; " +
                    "script-src 'self' 'sha256-ZT3q7lL9GXNGhPTB1Vvrvds2xw/kOV0zoeok2tiV23I=' 'sha256-FDyPg8CqqIpPAfGVKx1YeKduyLs0ghNYWII21wL+7HM=' cdn.jsdelivr.net cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js cdnjs.cloudflare.com/ajax/libs/jquery-validation-unobtrusive/3.2.11/jquery.validate.unobtrusive.min.js 'unsafe-inline' ; " +
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
