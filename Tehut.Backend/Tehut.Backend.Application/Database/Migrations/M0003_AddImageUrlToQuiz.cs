using FluentMigrator;
using Tehut.Backend.Application.Database.Schema;

namespace Tehut.Backend.Application.Database.Migrations
{
    [Migration(3)]
    public class M0003_AddImageUrlToQuiz : Migration
    {
        public override void Up()
        {
            Alter.Table(QuizTableSchema.TableName).AddColumn(QuizTableSchema.ImageUrl).AsString().Nullable();
        }

        public override void Down()
        {
            Delete.Column(QuizTableSchema.ImageUrl).FromTable(QuizTableSchema.TableName);
        }
    }
}
