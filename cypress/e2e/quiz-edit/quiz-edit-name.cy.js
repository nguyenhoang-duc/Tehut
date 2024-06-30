/// <reference types="cypress" />

describe("Quiz Edit Name", () => {
  beforeEach(() => {
    localStorage.clear();
    cy.visit("http://localhost:4200");

    cy.get("app-quiz-card:first [data-button-type='edit']").click();
  });

  it("should disable save button if name is empty and cancel name update when cancel was pressed", () => {
    cy.get("app-header-icon-button[data-button-type='edit']").click();
    cy.get("app-quiz-editname-dialog input").should("be.visible");

    cy.get("app-quiz-editname-dialog input").type("{selectall}{backspace}");
    cy.get("button[type='submit']").should("be.disabled");

    cy.get("app-quiz-editname-dialog input").type("My new Quiz");
    cy.get("[data-button-type='cancel']").click();

    cy.get("app-quiz-editname-dialog input").should("not.be.visible");
    cy.get("header").should("not.contain", "My new Quiz");
  });

  it("should save quiz name if save was pressed and should show it in the quiz overview", () => {
    cy.get("app-header-icon-button[data-button-type='edit']").click();
    cy.get("app-quiz-editname-dialog input").should("be.visible");

    cy.get("app-quiz-editname-dialog input").type(
      "{selectall}{backspace}My new Quiz"
    );
    cy.get("button[type='submit']").click();

    cy.get("app-quiz-editname-dialog input").should("not.be.visible");
    cy.get("header").should("contain", "My new Quiz");

    cy.get("[data-button-type='back']").click();
    cy.get("app-quiz-card:first").should("contain", "My new Quiz");
  });
});
