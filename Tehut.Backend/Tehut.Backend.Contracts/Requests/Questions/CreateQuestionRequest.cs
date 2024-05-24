namespace Tehut.Backend.Contracts.Requests.Questions
{
    public class CreateQuestionRequest
    {
        public string Question { get; set; } = string.Empty;

        public string Answer1 { get; set; } = string.Empty;

        public string Answer2 { get; set; } = string.Empty;

        public string Answer3 { get; set; } = string.Empty;

        public string Answer4 { get; set; } = string.Empty;

        public int CorrectAnswer { get; set; } = 0; 
    }
}
