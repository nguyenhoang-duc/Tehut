using System;

namespace Tehut.Backend.Application.Questions
{
    public interface IQuestionRepository
    {
        Task<QuizQuestion> CreateQuestion(QuizQuestion question, int quizId, CancellationToken cancellationToken = default);

        Task<bool> DeleteQuestion(Guid questionGuid, CancellationToken cancellationToken = default);

        Task<QuizQuestion?> GetQuestionByGuid(Guid questionGuid, CancellationToken cancellationToken = default);

        Task UpdateQuestion(QuizQuestion question, CancellationToken cancellationToken = default);

        Task<IEnumerable<QuizQuestion>> GetAllQuestions(int quizId, CancellationToken cancellationToken = default);

        Task<int> GetQuestionCount(int quizId, CancellationToken cancellationToken = default);
    }
}
