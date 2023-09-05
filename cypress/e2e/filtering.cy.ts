describe("Filtering Test", () => {
  beforeEach(() => {
    // Visit the page with filtering
    cy.visit("/explore");
  });

  it("should filter posts based on selected category", () => {
    // Select a category and verify the number of posts
    cy.get(".border-slate-400").contains("Toys").click();
    cy.get(".shadow-xl").should("have.length", 8);

    // Select a different category and verify the number of posts
    cy.get(".border-slate-400").contains("Audiobooks").click();
    cy.get(".shadow-xl").should("have.length", 10);

    // Select the same category again and verify specific content
    cy.get(".border-slate-400").contains("Audiobooks").click();
    cy.get(".shadow-xl").should("contain", "Libero exercitationem cum veniam");
  });

  it("should filter posts based on searched text", () => {
    // Verify the initial content
    cy.get(".shadow-xl").should("contain", "Libero exercitationem cum veniam");

    // Type and verify search results
    cy.get("input").type("A");
    cy.get(".shadow-xl").should("contain", "Architecto rerum minima");

    // Clear the search and verify the initial content
    cy.get("input").clear();
    cy.get(".shadow-xl").should("contain", "Libero exercitationem cum veniam");

    // Type a different search query and verify results
    cy.wait(200); // Wait for debounce or API response if needed
    cy.get("input").type("Bunos dias");
    cy.get(".shadow-xl").should("have.length", 1);
    cy.get(".text-slate-600").should("be.visible");
  });

  it("should filter posts based on selected category and searched text", () => {
    // Select a category and verify initial content
    cy.get(".border-slate-400").contains("Accessories").click();
    cy.get(".shadow-xl").should("contain", "At nobis inventore accusantium");

    // Type a search query and verify results
    cy.get("input").type("Null");
    cy.get(".shadow-xl").should(
      "contain",
      "Nulla eligendi ipsum est suscipit consequuntur",
    );

    // Clear the search and verify the initial content
    cy.get("input").clear();
    cy.get(".shadow-xl").should("contain", "At nobis inventore accusantium");

    // Type a different search query and verify results
    cy.wait(200); // Wait for debounce or API response if needed
    cy.get("input").type("Bunos dias");
    cy.get(".shadow-xl").should("have.length", 1);
  });
});
