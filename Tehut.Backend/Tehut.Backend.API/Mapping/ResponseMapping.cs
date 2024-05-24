using Tehut.Backend.Application.Questions;
using Tehut.Backend.Application.Quizzes;
using Tehut.Backend.Contracts.Responses.Questions;
using Tehut.Backend.Contracts.Responses.Quizzes;

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
            return new QuizzesResponse 
            { 
                Items = quizzes.Select(x => x.ToResponse()) 
            };
        }

        public static QuestionResponse ToResponse(this QuizQuestion question, Guid quizGuid = default)
        {
            return new QuestionResponse
            {
                QuizGuid = quizGuid,
                QuestionGuid = question.Guid,
                Question = question.Question,
                Answer1 = question.Answer1,
                Answer2 = question.Answer2,
                Answer3 = question.Answer3,
                Answer4 = question.Answer4,
                CorrectAnswer = question.CorrectAnswer,
            };
        }

        public static QuestionsResponse ToResponse(this IEnumerable<QuizQuestion> quizQuestions, Guid quizGuid = default)
        {
            return new QuestionsResponse
            {
                Items = quizQuestions.Select(x => x.ToResponse(quizGuid))
            };
        }
    }
}
