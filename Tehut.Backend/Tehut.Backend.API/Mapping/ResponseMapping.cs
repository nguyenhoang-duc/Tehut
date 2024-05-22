using Tehut.Backend.Application.Quizzes;
using Tehut.Backend.Contracts.Responses;

namespace Tehut.Backend.API.Mapping
{
    public static class ResponseMapping
    {
        public static QuizResponse ToResponse(this Quiz quiz)
        {
            return new QuizResponse
            {
                Guid = quiz.Guid,
                Name = quiz.Name,
            };
        }

        public static QuizzesResponse ToResponse(this IEnumerable<Quiz> quizzes)
        {
            return new QuizzesResponse { Items = quizzes.Select(x => x.ToResponse()) };
        }
    }
}
