beforeEach(() => {
  cy.visit("/");
});

describe("page content", () => {
  it("button with search text", () => {    
    cy.get("button").contains("Sök").should("exist");
  });

  it("input", () => {    
    cy.get("input").should("exist");
  });

  it("empty input", () => {
    cy.get("input").should("contain", "");
  });
});

describe("movies from api", () => {
  it("should search for movies", () => {
    cy.get("input#searchText").type("test").should("have.value", "test");

    cy.get("button#search").click();
  });

  it('search movie and create html-element', () => {
    cy.get("input#searchText").type("test").should("have.value", "test");

    cy.get("button#search").click();

    cy.get("div.movie").should("exist");
    cy.get("div.movie h3").should("exist");
    cy.get("div.movie img").should("exist");
  });
});

describe("errors", () => {
  it("error message", () => {
    cy.intercept("get", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"error"}).as("error")

    cy.get("input").type("test").should("have.value", "test")

    cy.get("form").submit()

    cy.get("p").contains("Inga sökresultat att visa")
  });
});

