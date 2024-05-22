using Tehut.Backend.Application.Quizzes;
using Tehut.Backend.Contracts.Requests;

namespace Tehut.Backend.API.Mapping
{
    public static class RequestMapping
    {
        public static Quiz ToQuiz(this CreateQuizRequest request) 
        {
            return new Quiz { Name = request.Name }; 
        }

        public static Quiz ToQuiz(this UpdateQuizRequest request, Quiz existingQuiz)
        {
            return new Quiz { Name = request.Name, Guid = existingQuiz.Guid }; 
        }
    }
}
