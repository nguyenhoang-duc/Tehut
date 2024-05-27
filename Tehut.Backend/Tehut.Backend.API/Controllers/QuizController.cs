using Microsoft.AspNetCore.Mvc;
using Tehut.Backend.API.Mapping;
using Tehut.Backend.Application.Questions;
using Tehut.Backend.Application.Quizzes;
using Tehut.Backend.Contracts.Requests.Quizzes;
using Tehut.Backend.Contracts.Responses.Quizzes;

[ApiController]
public class QuizController: ControllerBase 
{
    private readonly IQuizService quizService;
    private readonly IQuestionService questionService;

    public QuizController(IQuizService quizService, IQuestionService questionService)
    {
        this.quizService = quizService;
        this.questionService = questionService;
    }

    [HttpGet(ApiEndpoints.Quizzes.Get)]
    public async Task<IActionResult> Get([FromRoute]Guid quizId, CancellationToken cancellationToken = default)
    {
        var quiz = await quizService.GetQuizByGuid(quizId, cancellationToken);

        if (quiz is null)
        {
            return NotFound(); 
        }
        
        var response = quiz.ToResponse();

        response.QuestionCount = await questionService.GetQuestionCount(quiz.QuizId, cancellationToken); 

        return Ok(response);
    }

    [HttpGet(ApiEndpoints.Quizzes.GetAll)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken = default)
    {
        var quizzes = await quizService.GetAllQuizzes(cancellationToken);
        
        var quizResponses = new List<QuizResponse>();

        foreach (var quiz in quizzes)
        {
            var response = quiz.ToResponse();

            response.QuestionCount = await questionService.GetQuestionCount(quiz.QuizId, cancellationToken);

            quizResponses.Add(response);
        }

        return Ok(new QuizzesResponse { Items = quizResponses }); 
    }

    [HttpPost(ApiEndpoints.Quizzes.Create)]
    public async Task<IActionResult> Create([FromBody]CreateQuizRequest request, CancellationToken cancellationToken = default)
    {
        var quiz = request.ToQuiz();

        quiz = await quizService.CreateQuiz(quiz, cancellationToken);

        return CreatedAtAction(nameof(Get), new { quizId = quiz.Guid }, quiz.ToResponse());
    }   

    [HttpPut(ApiEndpoints.Quizzes.Update)]
    public async Task<IActionResult> Update([FromRoute]Guid quizId, [FromBody]UpdateQuizRequest request, CancellationToken cancellationToken)
    {
        var existingQuiz = await quizService.GetQuizByGuid(quizId);

        if (existingQuiz is null)
        {
            return NotFound(); 
        }

        var quiz = request.ToQuiz(existingQuiz);

        await quizService.UpdateQuiz(quiz, cancellationToken);

        return Ok(quiz.ToResponse());
    }
    
    [HttpDelete(ApiEndpoints.Quizzes.Delete)]
    public async Task<IActionResult> Delete([FromRoute]Guid quizId, CancellationToken cancellationToken)
    {
        var succesful = await quizService.DeleteQuiz(quizId, cancellationToken);

        return succesful ? Ok() : NotFound();
    }
}