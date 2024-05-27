using Microsoft.AspNetCore.Cors.Infrastructure;
using Tehut.Backend.API.Extensions;
using Tehut.Backend.Application;
using Tehut.Backend.Application.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplication(new DatabaseConfig { ConnectionString = builder.Configuration.GetConnectionString("Database")!});

var frontendOrigin = builder.Configuration.GetSection("CORS")["Frontend"]!;

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", builder => builder.WithOrigins(frontendOrigin).AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Frontend");

app.UseAuthorization();

app.MapControllers();

app.RunMigrations();

app.Run();
