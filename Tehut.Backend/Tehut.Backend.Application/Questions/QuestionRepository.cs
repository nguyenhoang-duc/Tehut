using Dapper;
using Tehut.Backend.Application.Database;
using Tehut.Backend.Application.Database.Schema;

namespace Tehut.Backend.Application.Questions
{
    internal class QuestionRepository : IQuestionRepository
    {
        private readonly IDatabaseFactory databaseFactory;

        public QuestionRepository(IDatabaseFactory databaseFactory) 
        {
            this.databaseFactory = databaseFactory;
        }

        public async Task<QuizQuestion> CreateQuestion(QuizQuestion question, int quizId, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            await connection.ExecuteAsync(new CommandDefinition($"""
                Insert into {QuizQuestionTableSchema.TableName} ({QuizQuestionTableSchema.Guid},{QuizQuestionTableSchema.QuizId},{QuizQuestionTableSchema.Question},{QuizQuestionTableSchema.Answer1},{QuizQuestionTableSchema.Answer2},{QuizQuestionTableSchema.Answer3},{QuizQuestionTableSchema.Answer4},{QuizQuestionTableSchema.CorrectAnswer}) 
                values (@Guid, @quizId, @Question, @Answer1, @Answer2, @Answer3, @Answer4, @CorrectAnswer);
            """, new { question.Guid, quizId, question.Question, question.Answer1, question.Answer2, question.Answer3, question.Answer4, question.CorrectAnswer } ,cancellationToken: cancellationToken));   

            return question; 

        }

        public async Task<bool> DeleteQuestion(Guid questionGuid, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            var affectedRows = await connection.ExecuteAsync(new CommandDefinition($"""
                Delete from {QuizQuestionTableSchema.TableName} where {QuizQuestionTableSchema.Guid} = @questionGuid;
            """, new { questionGuid }, cancellationToken: cancellationToken));

            return affectedRows > 0; 
        }

        public async Task<IEnumerable<QuizQuestion>> GetAllQuestions(int quizId, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            var quizzes = await connection.QueryAsync<QuizQuestion>(new CommandDefinition($"""
                Select * from {QuizQuestionTableSchema.TableName} where {QuizQuestionTableSchema.QuizId} = @quizId;
            """, new { quizId }, cancellationToken: cancellationToken));

            return quizzes; 
        }

        public async Task<int> GetQuestionCount(int quizId, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            return await connection.ExecuteScalarAsync<int>(new CommandDefinition($"""
                Select count(*) from {QuizQuestionTableSchema.TableName} where {QuizQuestionTableSchema.QuizId} = @quizId;
            """, new { quizId }, cancellationToken: cancellationToken));
        }

        public async Task<QuizQuestion?> GetQuestionByGuid(Guid questionGuid, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            var quiz = await connection.QueryFirstOrDefaultAsync<QuizQuestion>(new CommandDefinition($"""
                Select * from {QuizQuestionTableSchema.TableName} where {QuizQuestionTableSchema.Guid} = @questionGuid;
            """, new { questionGuid }, cancellationToken: cancellationToken));

            return quiz;
        }

        public async Task UpdateQuestion(QuizQuestion question, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            await connection.ExecuteAsync(new CommandDefinition($"""
                Update {QuizQuestionTableSchema.TableName} 
                Set {QuizQuestionTableSchema.Question} = @Question,
                {QuizQuestionTableSchema.Answer1} = @Answer1, 
                {QuizQuestionTableSchema.Answer2} = @Answer2, 
                {QuizQuestionTableSchema.Answer3} = @Answer3, 
                {QuizQuestionTableSchema.Answer4} = @Answer4, 
                {QuizQuestionTableSchema.CorrectAnswer} = @CorrectAnswer
                Where {QuizQuestionTableSchema.Guid} = @Guid
            """, new { question.Question, question.Answer1, question.Answer2, question.Answer3, question.Answer4, question.CorrectAnswer, question.Guid }, cancellationToken: cancellationToken));
        }
    }
}
