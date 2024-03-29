﻿using System.Diagnostics.CodeAnalysis;

namespace Tehut.Core.Models
{
    public class Quiz
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public List<QuizQuestion> Questions { get; set; } = new();
    }
}
