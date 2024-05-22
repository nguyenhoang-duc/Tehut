using System.Data.Common;

namespace Tehut.Backend.Application.Database
{
    internal interface IDatabaseFactory
    {
        DbConnection CreateConnection();
    }
}
