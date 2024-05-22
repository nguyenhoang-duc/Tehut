using FluentMigrator.Runner;

namespace Tehut.Backend.Application.Database
{
    internal class DatabaseMigrator: IDatabaseMigrator
    {
        private readonly IMigrationRunner migrationRunner;

        public DatabaseMigrator(IMigrationRunner migrationRunner) 
        {
            this.migrationRunner = migrationRunner;
        }

        public void EnsureDatabase()
        {
            migrationRunner.MigrateUp();
        }
    }
}
