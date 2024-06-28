/// <reference types="cypress" />

describe("General Quiz Management", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
    localStorage.clear();
  });

  it("should add new quiz when clicking add quiz buttons", () => {
    cy.get("[data-cy='add-quiz-card-button'").click();
    cy.get("app-quiz-card").should("have.length", 3);

    cy.get("[data-cy='add-quiz-card-button']").click();
    cy.get("app-quiz-card").should("have.length", 4);
  });

  it("should not delete the quiz when cancelling the deletion", () => {
    cy.get("app-quiz-card:first [data-button-type='delete']").click();
    cy.get("app-quiz-deletion-dialog").should("exist");

    cy.get(
      "app-quiz-card:first app-quiz-deletion-dialog [data-button-type='cancel']"
    ).click();
    cy.get("app-quiz-card").should("have.length", 2);
  });

  it("should delete the quiz when confirming the deletion", () => {
    cy.get("app-quiz-card:first [data-button-type='delete']").click();
    cy.get("app-quiz-deletion-dialog").should("exist");

    cy.get(
      "app-quiz-card:first app-quiz-deletion-dialog [data-button-type='submit']"
    ).click();
    cy.get("app-quiz-card").should("have.length", 1);
  });

  it("should delete a new quiz without asking", () => {
    cy.get("[data-cy='add-quiz-card-button'").click();
    cy.get("app-quiz-card").should("have.length", 3);

    cy.get("app-quiz-card:last [data-button-type='delete']").click();
    cy.get("app-quiz-card").should("have.length", 2);
  });

  it("should only show science quiz after typing in searchbar", () => {
    cy.get("app-search-bar").type("Sci");
    cy.get("app-quiz-card").should("have.length", 1);
    cy.get("app-quiz-card:first").contains("Science");

    cy.get("app-search-bar [data-button-type='clear']").click();
    cy.get("app-quiz-card").should("have.length", 2);
  });
});
