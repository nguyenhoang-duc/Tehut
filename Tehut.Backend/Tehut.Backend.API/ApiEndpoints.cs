public static class ApiEndpoints{
    private const string ApiBase = "api"; 

    public static class Quizzes{
        private const string Base = $"{ApiBase}/quizzes";

        public const string Create = Base; 
        public const string Delete = $"{Base}/{{quizId:guid}}";
        public const string Update = $"{Base}/{{quizId:guid}}";
        public const string GetAll = $"{Base}"; 
        public const string Get = $"{Base}/{{quizId:guid}}";
    }

    public static class Questions{
        private const string Base = $"{ApiBase}/quizzes/{{quizId:guid}}/questions";

        public const string Create = Base; 
        public const string Delete = $"{Base}/{{questionId:guid}}";
        public const string Update = $"{Base}/{{questionId:guid}}";
        public const string GetAll = $"{Base}"; 
        public const string Get = $"{Base}/{{questionId:guid}}";
    }
}