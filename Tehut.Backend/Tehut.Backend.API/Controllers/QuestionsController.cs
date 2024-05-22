using Microsoft.AspNetCore.Mvc;

[ApiController]
public class QuestionsController: ControllerBase
{
    [HttpGet(ApiEndpoints.Questions.Get)]
    public async Task<IActionResult> Get([FromRoute]Guid quizId, [FromRoute]Guid questionId)
    {
        return Ok();
    }

    [HttpGet(ApiEndpoints.Questions.GetAll)]
    public async Task<IActionResult> GetAll([FromRoute]Guid quizId)
    {
        return Ok();
    }

    [HttpPost(ApiEndpoints.Questions.Create)]
    public async Task<IActionResult> Create([FromRoute]Guid quizId)
    {
        return Created();
    }

    [HttpPut(ApiEndpoints.Questions.Update)]
    public async Task<IActionResult> Update([FromRoute]Guid quizId, [FromRoute]Guid questionId)
    {
        return Ok();
    }

    [HttpDelete(ApiEndpoints.Questions.Delete)]
    public async Task<IActionResult> Delete([FromRoute]Guid quizId, [FromRoute]Guid questionId)
    {
        return Ok();
    }
}