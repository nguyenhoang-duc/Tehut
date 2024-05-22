using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using Tehut.Backend.Application.Database;
using Tehut.Backend.Application.Database.Migrations;
using Tehut.Backend.Application.Questions;
using Tehut.Backend.Application.Quizzes;

namespace Tehut.Backend.Application
{
    public static class ApplicationServiceExtension
    {
        public static void AddApplication(this IServiceCollection serviceCollection, DatabaseConfig databaseConfig)
        {
            serviceCollection.AddSingleton<IQuizRepository, QuizRepository>();   
            serviceCollection.AddSingleton<IQuizService, QuizService>();
            serviceCollection.AddSingleton<IQuestionRepository, QuestionRepository>();
            serviceCollection.AddSingleton<IQuestionService, QuestionService>();    

            serviceCollection.AddDatabase(databaseConfig); 
        }

        private static void AddDatabase(this IServiceCollection serviceCollection, DatabaseConfig databaseConfig)
        { 
            serviceCollection.AddSingleton<IDatabaseFactory, NpgsqlDatabaseFactory>();
            serviceCollection.AddScoped<IDatabaseMigrator, DatabaseMigrator>();
            serviceCollection.AddSingleton(databaseConfig);

            serviceCollection.AddFluentMigratorCore().ConfigureRunner(builder =>
            {
                builder.AddPostgres()
                       .WithGlobalConnectionString(databaseConfig.ConnectionString)
                       .ScanIn(typeof(IMigrationMarker).Assembly).For.Migrations();
            }).AddLogging();
        }
    }
}
