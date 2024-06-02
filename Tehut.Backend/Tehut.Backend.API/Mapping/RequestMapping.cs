using Tehut.Backend.Application.Questions;
using Tehut.Backend.Application.Quizzes;
using Tehut.Backend.Contracts.Requests.Questions;
using Tehut.Backend.Contracts.Requests.Quizzes;

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
            return new Quiz { Name = request.Name ?? existingQuiz.Name, ImageUrl = request.ImageUrl ?? existingQuiz.ImageUrl, Guid = existingQuiz.Guid }; 
        }

        public static QuizQuestion ToQuestion(this CreateQuestionRequest request)
        {
            return new QuizQuestion
            {
                Question = request.Question,
                Answer1 = request.Answer1,
                Answer2 = request.Answer2,
                Answer3 = request.Answer3,
                Answer4 = request.Answer4,
                CorrectAnswer = request.CorrectAnswer,
            };
        }

        public static QuizQuestion ToQuestion(this UpdateQuestionRequest request, QuizQuestion existingQuestion) 
        {
            return new QuizQuestion
            {
                Guid = existingQuestion.Guid,
                Question = request.Question ?? existingQuestion.Question,
                Answer1 = request.Answer1 ?? existingQuestion.Answer1,
                Answer2 = request.Answer2 ?? existingQuestion.Answer2,
                Answer3 = request.Answer3 ?? existingQuestion.Answer3,
                Answer4 = request.Answer4 ?? existingQuestion.Answer4,
                CorrectAnswer = request.CorrectAnswer ?? existingQuestion.CorrectAnswer,
            };
        }
    }
}
