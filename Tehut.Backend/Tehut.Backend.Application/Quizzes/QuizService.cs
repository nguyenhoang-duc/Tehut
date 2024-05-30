namespace Tehut.Backend.Application.Quizzes
{
    internal class QuizService: IQuizService
    {
        private readonly IQuizRepository repository;

        public QuizService(IQuizRepository repository) 
        {
            this.repository = repository;
        }

        public async Task<Quiz> CreateQuiz(Quiz quiz, CancellationToken cancellationToken = default)
        {
            quiz.Guid = Guid.NewGuid(); 

            return await repository.CreateQuiz(quiz, cancellationToken);
        }

        public async Task<bool> DeleteQuiz(Guid quizGuid, CancellationToken cancellationToken = default)
        {
            var quiz = await repository.GetQuizByGuid(quizGuid, cancellationToken);

            if (quiz is null)
            {
                return false; 
            }

            return await repository.DeleteQuiz(quiz.QuizId, cancellationToken);  
        }

        public Task<IEnumerable<Quiz>> GetAllQuizzes(CancellationToken cancellationToken = default)
        {
            return repository.GetAllQuizzes(cancellationToken);
        }

        public Task<Quiz?> GetQuizByGuid(Guid quizGuid, CancellationToken cancellationToken = default)
        {
            return repository.GetQuizByGuid(quizGuid, cancellationToken);
        }

        public Task<Quiz?> GetQuizById(int quizId, CancellationToken cancellationToken = default)
        { 
            return repository.GetQuizById(quizId, cancellationToken);
        } 

        public Task<bool> UpdateQuiz(Quiz quiz, CancellationToken cancellationToken = default)
        {
            return repository.UpdateQuiz(quiz, cancellationToken);  
        }
    }
}
