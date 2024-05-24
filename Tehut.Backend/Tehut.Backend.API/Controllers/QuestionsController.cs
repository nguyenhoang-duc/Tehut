using Microsoft.AspNetCore.Mvc;
using Tehut.Backend.API.Mapping;
using Tehut.Backend.Application.Questions;
using Tehut.Backend.Application.Quizzes;
using Tehut.Backend.Contracts.Requests.Questions;

[ApiController]
public class QuestionsController: ControllerBase
{
    private readonly IQuestionService questionService;
    private readonly IQuizService quizService;

    public QuestionsController(IQuestionService questionService, IQuizService quizService)
    {
        this.questionService = questionService;
        this.quizService = quizService;
    }

    [HttpGet(ApiEndpoints.Questions.Get)]
    public async Task<IActionResult> Get([FromRoute]Guid questionId, CancellationToken cancellationToken = default)
    {
        var question = await questionService.GetQuestionByGuid(questionId, cancellationToken);

        if (question is null)
        {
            return NotFound(); 
        }

        var quiz = await quizService.GetQuizById(question.QuizId, cancellationToken);

        return Ok(question.ToResponse(quiz?.Guid ?? Guid.Empty));
    }

    [HttpGet(ApiEndpoints.Questions.GetAll)]
    public async Task<IActionResult> GetAll([FromRoute]Guid quizId, CancellationToken cancellationToken = default)
    {
        var quiz = await quizService.GetQuizByGuid(quizId, cancellationToken);

        if (quiz is null)
        {
            return NotFound(); 
        }

        var questions = await questionService.GetAllQuestions(quiz.QuizId, cancellationToken);

        return Ok(questions.ToResponse(quizId));
    }

    [HttpPost(ApiEndpoints.Questions.Create)]
    public async Task<IActionResult> Create([FromRoute]Guid quizId, [FromBody]CreateQuestionRequest request, CancellationToken cancellationToken = default)
    {
        var quiz = await quizService.GetQuizByGuid(quizId, cancellationToken);

        if (quiz is null)
        {
            return NotFound();
        }

        var question = await questionService.CreateQuestion(request.ToQuestion(), quiz.QuizId, cancellationToken);

        return CreatedAtAction(nameof(Get), new { questionId = question.Guid }, question.ToResponse());
    }

    [HttpPut(ApiEndpoints.Questions.Update)]
    public async Task<IActionResult> Update([FromRoute]Guid questionId, [FromBody]UpdateQuestionRequest request, CancellationToken cancellationToken = default)
    {
        var existingQuestion = await questionService.GetQuestionByGuid(questionId, cancellationToken);

        if (existingQuestion is null)
        {
            return NotFound(); 
        }

        var question = request.ToQuestion(existingQuestion); 

        await questionService.UpdateQuestion(question, cancellationToken);

        var quiz = await quizService.GetQuizById(existingQuestion.QuizId, cancellationToken);

        return Ok(question.ToResponse(quiz?.Guid ?? Guid.Empty));
    }

    [HttpDelete(ApiEndpoints.Questions.Delete)]
    public async Task<IActionResult> Delete([FromRoute]Guid quizId, [FromRoute]Guid questionId, CancellationToken cancellationToken = default)
    {
        var succesful = await questionService.DeleteQuestion(questionId, cancellationToken);

        return succesful ? Ok() : NotFound();
    }
}