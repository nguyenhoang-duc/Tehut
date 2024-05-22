using Microsoft.Extensions.DependencyInjection;
using Tehut.Backend.Application.Database;
using Tehut.Backend.Application.Questions;
using Tehut.Backend.Application.Quizzes;

namespace Tehut.Backend.Application
{
    public static class ApplicationServiceExtension
    {
        public static void AddApplication(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IQuizzesRepository, QuizzesRespository>();   
            serviceCollection.AddSingleton<IQuizzesService, QuizzesService>();
            serviceCollection.AddSingleton<IQuestionRepository, QuestionRepository>();
            serviceCollection.AddSingleton<IQuestionService, QuestionService>();    

            serviceCollection.AddDatabase(); 
        }

        private static void AddDatabase(this IServiceCollection serviceCollection)
        { 
            serviceCollection.AddSingleton<IDatabaseFactory, NpgsqlDatabaseFactory>();
            serviceCollection.AddSingleton<IDatabaseConfig, NpgsqlDatabaseConfig>();
        }
    }
}
