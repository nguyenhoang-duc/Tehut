using Npgsql;
using System.Data.Common;

namespace Tehut.Backend.Application.Database
{
    internal class NpgsqlDatabaseFactory : IDatabaseFactory
    {
        private readonly DatabaseConfig databaseConfig;

        public NpgsqlDatabaseFactory(DatabaseConfig databaseConfig) 
        {
            this.databaseConfig = databaseConfig;
        }

        public DbConnection CreateConnection()
        {
            return new NpgsqlConnection(databaseConfig.ConnectionString);
        }
    }
}
