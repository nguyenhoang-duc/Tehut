namespace Tehut.Backend.Application.Quizzes
{
    internal interface IQuizRepository
    {
        Task<Quiz> CreateQuiz(Quiz quiz, CancellationToken cancellationToken = default);

        Task<bool> DeleteQuiz(int quizId, CancellationToken cancellationToken = default);

        Task<IEnumerable<Quiz>> GetAllQuizzes(CancellationToken cancellationToken = default);
        
        Task<Quiz?> GetQuizByGuid(Guid quizGuid, CancellationToken cancellationToken = default);

        Task<Quiz?> GetQuizById(int quizId, CancellationToken cancellationToken = default);
        
        Task<bool> UpdateQuiz(Quiz quiz, CancellationToken cancellationToken = default);
    }
}
