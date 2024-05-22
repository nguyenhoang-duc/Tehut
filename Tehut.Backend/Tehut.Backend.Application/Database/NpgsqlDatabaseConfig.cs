namespace Tehut.Backend.Application.Database
{
    internal class NpgsqlDatabaseConfig : IDatabaseConfig
    {
        public string ConnectionString { get; }

        public NpgsqlDatabaseConfig(string connectionString) 
        {
            ConnectionString = connectionString;
        }
    }
}
