using System.Data.Common;

namespace Tehut.Backend.Application.Database
{
    public interface IDatabaseFactory
    {
        DbConnection CreateConnection();
    }
}
