﻿namespace Tehut.Backend.Application.Questions
{
    public class QuizQuestion
    {
        public int QuestionId { get; set; }

        public int QuizId { get; set; }

        public Guid Guid { get; set; }

        public Guid QuizGuid { get; set; }

        public string Question { get; set; } = string.Empty;

        public string Answer1 { get; set; } = string.Empty;

        public string Answer2 { get; set; } = string.Empty;

        public string Answer3 { get; set; } = string.Empty;

        public string Answer4 { get; set; } = string.Empty;

        public int CorrectAnswer { get; set; }
    }
}