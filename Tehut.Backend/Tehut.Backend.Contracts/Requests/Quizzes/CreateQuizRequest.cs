namespace Tehut.Backend.Contracts.Requests.Quizzes
{
    public class CreateQuizRequest
    {
        public string Name { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;
    }
}
