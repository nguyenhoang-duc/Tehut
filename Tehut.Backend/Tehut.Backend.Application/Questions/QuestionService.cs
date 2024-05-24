
namespace Tehut.Backend.Application.Questions
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository repository;

        public QuestionService(IQuestionRepository repository) 
        {
            this.repository = repository;
        }

        public async Task<QuizQuestion> CreateQuestion(QuizQuestion question, int quizId, CancellationToken cancellationToken = default)
        {
            question.Guid = Guid.NewGuid(); 

            return await repository.CreateQuestion(question, quizId, cancellationToken);
        }

        public Task<bool> DeleteQuestion(Guid questionGuid, CancellationToken cancellationToken = default)
        {
            return repository.DeleteQuestion(questionGuid, cancellationToken);
        }

        public Task<IEnumerable<QuizQuestion>> GetAllQuestions(int quizId, CancellationToken cancellationToken = default)
        {
            return repository.GetAllQuestions(quizId, cancellationToken);
        }

        public Task<QuizQuestion?> GetQuestionByGuid(Guid questionGuid, CancellationToken cancellationToken = default)
        {
            return repository.GetQuestionByGuid(questionGuid, cancellationToken);
        }

        public Task UpdateQuestion(QuizQuestion question, CancellationToken cancellationToken = default)
        {
            return repository.UpdateQuestion(question, cancellationToken);
        }
    }
}