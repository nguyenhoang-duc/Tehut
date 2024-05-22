using Dapper;
using Tehut.Backend.Application.Database;
using Tehut.Backend.Application.Database.Schema;

namespace Tehut.Backend.Application.Quizzes
{
    internal class QuizRepository : IQuizRepository
    {
        private readonly IDatabaseFactory databaseFactory;

        public QuizRepository(IDatabaseFactory databaseFactory) 
        {
            this.databaseFactory = databaseFactory;
        }

        public async Task<Quiz> CreateQuiz(Quiz quiz, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            var quizId = await connection.ExecuteScalarAsync<int>(new CommandDefinition($"""
                Insert into {QuizTableSchema.TableName} ({QuizTableSchema.Guid}, {QuizTableSchema.Name}) values (@Guid, @Name) Returning {QuizTableSchema.Id};
                """, quiz, cancellationToken: cancellationToken));

            quiz.Id = quizId;

            return quiz;
        }

        public async Task<bool> DeleteQuiz(Guid quizGuid, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            var affectedRows = await connection.ExecuteAsync(new CommandDefinition($""" 
                Delete from {QuizTableSchema.TableName} where {QuizTableSchema.Guid} = @quizGuid;
                """, new { quizGuid }, cancellationToken: cancellationToken));

            return affectedRows > 0;
        }

        public async Task<IEnumerable<Quiz>> GetAllQuizzes(CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            var quizzes = await connection.QueryAsync<Quiz>(new CommandDefinition($"""
                Select * from {QuizTableSchema.TableName}; 
                """, cancellationToken: cancellationToken));

            return quizzes; 
        }

        public async Task<Quiz?> GetQuizByGuid(Guid quizGuid, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            var quiz = await connection.QueryFirstOrDefaultAsync<Quiz>(new CommandDefinition($""" 
                Select * from {QuizTableSchema.TableName} where {QuizTableSchema.Guid} = @quizGuid
                """, new { quizGuid }, cancellationToken: cancellationToken));

            return quiz;
        }

        public async Task<bool> UpdateQuiz(Quiz quiz, CancellationToken cancellationToken = default)
        {
            using var connection = databaseFactory.CreateConnection();

            var affectedRows = await connection.ExecuteAsync(new CommandDefinition($"""
                Update {QuizTableSchema.TableName}
                Set {QuizTableSchema.Name} = @Name
                Where {QuizTableSchema.Guid} = @Guid
                """, new { quiz.Name, quiz.Guid }, cancellationToken: cancellationToken)); 

            return affectedRows > 0;
        }
    }
}
