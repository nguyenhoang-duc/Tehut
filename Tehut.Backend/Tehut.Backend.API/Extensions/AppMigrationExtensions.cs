using Tehut.Backend.Application.Database;

namespace Tehut.Backend.API.Extensions
{
    public static class AppMigrationExtensions
    {
        public static void RunMigrations(this WebApplication app)
        {
            using var migrationScope = app.Services.CreateScope();
         
            var migrator = migrationScope.ServiceProvider.GetRequiredService<IDatabaseMigrator>();
            
            migrator.EnsureDatabase();
        }
    }
}
