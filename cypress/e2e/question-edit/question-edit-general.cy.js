/// <reference types="cypress" />

describe("General Question Editing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
    localStorage.clear();

    cy.get("app-quiz-card:first [data-button-type='edit']").click();
    cy.get("app-question-card:first [data-button-type='edit']").click();
  });

  it("should disable save button if the question is empty and not save question if cancel was pressed", () => {
    cy.get("#question").type("{selectall}{backspace}");
    cy.get("button[type='submit']").should("be.disabled");

    cy.get("#question").type("{selectall}{backspace}What is 2+2?");
    cy.get("[data-button-type='cancel']").click();
    cy.get("app-question-card:first").should("not.contain", "What is 2+2?");
  });

  it("should save the question if save was pressed", () => {
    cy.get("#question").type("{selectall}{backspace}What is 2+2?");
    cy.get("button[type='submit']").should("not.be.disabled").click();
    cy.get("app-question-card:first").should("contain", "What is 2+2?");
  });
});
