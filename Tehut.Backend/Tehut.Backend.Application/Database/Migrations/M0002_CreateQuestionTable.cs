using FluentMigrator;
using Tehut.Backend.Application.Database.Schema;

namespace Tehut.Backend.Application.Database.Migrations
{
    [Migration(2)]
    public class M0002_CreateQuestionTable : Migration
    {
        public override void Up()
        {
            Create.Table(QuizQuestionTableSchema.TableName)
                .WithColumn(QuizQuestionTableSchema.Id).AsInt32().PrimaryKey().Identity()
                .WithColumn(QuizQuestionTableSchema.Guid).AsGuid().Indexed()
                .WithColumn(QuizQuestionTableSchema.QuizId).AsInt32().NotNullable()
                .WithColumn(QuizQuestionTableSchema.Question).AsString().Nullable()
                .WithColumn(QuizQuestionTableSchema.Answer1).AsString().Nullable()
                .WithColumn(QuizQuestionTableSchema.Answer2).AsString().Nullable()
                .WithColumn(QuizQuestionTableSchema.Answer3).AsString().Nullable()
                .WithColumn(QuizQuestionTableSchema.Answer4).AsString().Nullable()
                .WithColumn(QuizQuestionTableSchema.CorrectAnswer).AsInt16().Nullable();

            Create.ForeignKey("FK_Questions_QuizId")
                .FromTable(QuizQuestionTableSchema.TableName)
                .ForeignColumn(QuizQuestionTableSchema.QuizId)
                .ToTable(QuizTableSchema.TableName)
                .PrimaryColumn(QuizTableSchema.Id);
        }

        public override void Down()
        {
            Delete.ForeignKey("FK_Questions_QuizId").OnTable(QuizQuestionTableSchema.TableName);
            Delete.Table(QuizQuestionTableSchema.TableName);
        }
    }
}
