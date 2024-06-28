/// <reference types="cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Basic Quiz Edit", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
    localStorage.clear();
  });

  it("should change the quiz name when typing into the quiz name field", () => {
    cy.get("app-quiz-card:first [data-cy='quiz-name']")
      .click()
      .type("{selectall}{backspace}My Quiz");
    cy.get("app-quiz-card:first [data-cy='quiz-name']").contains("My Quiz");
  });

  it("should change quiz image when changing image url", () => {
    cy.get("app-quiz-card:first [data-cy='upload-image-button']").click();
    cy.get("app-quiz-card:first app-quiz-editimage-dialog input").should(
      "be.visible"
    );

    cy.get("app-quiz-card:first app-quiz-editimage-dialog input").type(
      "https://tehut-1c712.web.app/assets/aviation.jpg"
    );
    cy.get(
      "app-quiz-card:first app-quiz-editimage-dialog [data-button-type='submit']"
    ).click();
    cy.get("app-quiz-card:first [data-cy='upload-image-button']").should(
      "have.css",
      "background-image",
      'url("https://tehut-1c712.web.app/assets/aviation.jpg")'
    );
  });
});
