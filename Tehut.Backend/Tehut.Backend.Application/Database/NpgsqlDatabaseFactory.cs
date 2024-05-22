using Npgsql;
using System.Data.Common;

namespace Tehut.Backend.Application.Database
{
    internal class NpgsqlDatabaseFactory : IDatabaseFactory
    {
        private readonly IDatabaseConfig databaseConfig;

        public NpgsqlDatabaseFactory(IDatabaseConfig databaseConfig) 
        {
            this.databaseConfig = databaseConfig;
        }

        public DbConnection CreateConnection()
        {
            return new NpgsqlConnection(databaseConfig.ConnectionString);
        }
    }
}
