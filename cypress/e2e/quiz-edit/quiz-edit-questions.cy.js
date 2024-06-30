/// <reference types="cypress" />

describe("Quiz Edit Questions", () => {
  beforeEach(() => {
    localStorage.clear();
    cy.visit("http://localhost:4200");
    cy.get("[data-cy='add-quiz-card-button']").click();

    cy.get("app-quiz-card")
      .should("have.length", 3)
      .get("app-quiz-card:last [data-button-type='edit']")
      .click();
  });

  it("should add a question to the quiz when clicking button and update the question count", () => {
    cy.get("app-header-icon-button[data-button-type='add']").click();
    cy.get("app-question-card").should("have.length", 1);

    cy.get("[data-cy='add-question-card-button']").click();
    cy.get("app-question-card").should("have.length", 2);

    cy.get("[data-button-type='back']").click();
    cy.get("app-quiz-card:last").should("contain", "2 Questions");
  });

  it("should remove a question when clicking on the delete button and update the question count", () => {
    cy.get("app-header-icon-button[data-button-type='add']").click();
    cy.get("app-question-card").should("have.length", 1);

    cy.get("[data-button-type='back']").click();
    cy.get("app-quiz-card:last").should("contain", "1 Question");

    cy.get("app-quiz-card:last [data-button-type='edit']").click();
    cy.get("app-question-card:first [data-button-type='delete']").click();

    cy.get("app-question-card").should("not.exist");

    cy.get("[data-button-type='back']").click();
    cy.get("app-quiz-card:last").should("contain", "No Questions");
  });
});
