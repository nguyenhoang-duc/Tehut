using FluentMigrator;
using Tehut.Backend.Application.Database.Schema;

namespace Tehut.Backend.Application.Database.Migrations
{
    [Migration(1)]
    public class M0001_CreateQuizTable : Migration
    {
        public override void Up()
        {
            Create.Table(QuizTableSchema.TableName)
                .WithColumn(QuizTableSchema.Id).AsInt32().PrimaryKey().Identity()
                .WithColumn(QuizTableSchema.Guid).AsGuid().Indexed()
                .WithColumn(QuizTableSchema.Name).AsString().Nullable();
        }

        public override void Down()
        {
            Delete.Table(QuizTableSchema.TableName);
        }
    }
}
