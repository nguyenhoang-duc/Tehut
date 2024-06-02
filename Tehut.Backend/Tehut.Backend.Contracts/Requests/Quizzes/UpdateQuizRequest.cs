using System.Text.Json.Serialization;

namespace Tehut.Backend.Contracts.Requests.Quizzes
{
    public class UpdateQuizRequest
    {
        public string? Name { get; set; } = null!;

        public string? ImageUrl { get; set; } = null!;
    }
}
