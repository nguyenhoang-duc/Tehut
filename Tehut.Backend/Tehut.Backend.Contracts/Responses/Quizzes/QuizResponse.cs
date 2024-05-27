namespace Tehut.Backend.Contracts.Responses.Quizzes
{
    public class QuizResponse
    {
        public Guid Guid { get; set; }

        public string Name { get; set; } = string.Empty;

        public int QuestionCount { get; set; }
    }
}
