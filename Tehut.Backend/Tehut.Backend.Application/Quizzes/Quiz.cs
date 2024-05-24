using Tehut.Backend.Application.Questions;

namespace Tehut.Backend.Application.Quizzes
{
    public class Quiz
    {
        public int QuizId { get; set; }

        public Guid Guid { get; set; }

        public string Name { get; set; } = string.Empty;

        public IEnumerable<QuizQuestion> Questions { get; set; } = [];
    }
}
