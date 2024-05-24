namespace Tehut.Backend.Contracts.Responses.Questions
{
    public class QuestionResponse
    {
        public required Guid QuestionGuid { get; set; }

        public required Guid QuizGuid { get; set; }

        public required string Question { get; set; } = string.Empty;

        public required string Answer1 { get; set; } = string.Empty;

        public required string Answer2 { get; set; } = string.Empty;

        public required string Answer3 { get; set; } = string.Empty;

        public required string Answer4 { get; set; } = string.Empty;

        public required int CorrectAnswer { get; set; }
    }
}
