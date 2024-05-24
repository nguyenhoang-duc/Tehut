namespace Tehut.Backend.Contracts.Requests.Questions
{
    public class UpdateQuestionRequest
    {
        public string? Question { get; set; }

        public string? Answer1 { get; set; }

        public string? Answer2 { get; set; }

        public string? Answer3 { get; set; }

        public string? Answer4 { get; set; }

        public int? CorrectAnswer { get; set; }
    }
}
