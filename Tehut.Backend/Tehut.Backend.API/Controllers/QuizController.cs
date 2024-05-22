using Microsoft.AspNetCore.Mvc;

[ApiController]
public class QuizController: ControllerBase 
{

    [HttpGet(ApiEndpoints.Quizzes.Get)]
    public async Task<IActionResult> Get([FromRoute]Guid id)
    {
        return Ok("HI" + id);
    }

    [HttpGet(ApiEndpoints.Quizzes.GetAll)]
    public async Task<IActionResult> GetAll()
    {
        return Ok("Hi all"); 
    }

    [HttpPost(ApiEndpoints.Quizzes.Create)]
    public async Task<IActionResult> Create()
    {
        return Created();
    }   

    [HttpPut(ApiEndpoints.Quizzes.Update)]
    public async Task<IActionResult> Update([FromRoute]Guid id)
    {
        return Ok("Updated"+ id);
    }
    
    [HttpDelete(ApiEndpoints.Quizzes.Delete)]
    public async Task<IActionResult> Delete([FromRoute]Guid id)
    {
        return Ok("Deleted" + id);
    }
}