using Tehut.Backend.Application.Questions;

namespace Tehut.Backend.Application.Quizzes
{
    internal class Quiz
    {
        public int Id { get; init; }

        public Guid Guid { get; set; }

        public string Name { get; set; } = string.Empty;

        public IEnumerable<QuizQuestion> Questions { get; set; } = [];
    }
}
