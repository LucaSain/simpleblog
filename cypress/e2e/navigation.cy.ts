describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates through the application", () => {
    // Click on Explore link
    cy.get("a").contains("Explore").click();
    cy.url().should("contain", "/explore");

    // Verify no category is selected
    cy.get(".max-w-screen .rounded-xl").each(($category) => {
      cy.wrap($category).should("not.have.class", "bg-slate-400");
    });

    // Click on a post link
    cy.get("a").contains("Libero exercitationem cum veniam").click();
    cy.url().should("contain", "/post/libero-exercitationem-cum-veniam");

    // Click on a category link
    cy.get("a").contains("Audiobooks").click();

    // Verify only one category is selected
    cy.get(".max-w-screen .rounded-xl").each(($category) => {
      if ($category.hasClass("bg-slate-400")) {
        cy.wrap($category).should("have.length", 1);
      } else {
        cy.wrap($category).should("not.have.class", "bg-slate-400");
      }
    });

    // Go back to home page
    cy.get("a").contains("Simple blog").click();

    // Go back to the post
    cy.get("a").contains("Libero exercitationem cum veniam").click();
    cy.url().should("contain", "/post/libero-exercitationem-cum-veniam");
  });
});
