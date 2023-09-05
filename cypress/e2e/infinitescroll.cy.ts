describe("Infinite Scroll Test", () => {
  beforeEach(() => {
    cy.visit("/explore");
  });

  it("should load more content on scroll", () => {
    const initialItemCount = 10;
    const scrollCount = 4;
    const waitTime = 300;

    // Wait for initial content to load
    cy.wait(1000);

    // Scroll down multiple times to trigger loading more content
    for (let i = 0; i < scrollCount; i++) {
      // Scroll to the bottom of the container
      cy.scrollTo("center");

      // Wait for new content to load
      cy.wait(waitTime);

      cy.scrollTo("bottom");

      // Update the expected count of loaded items
      const expectedItemCount = initialItemCount + i * 9;

      // Verify that the expected number of items is displayed
      cy.get(".shadow-xl").should("have.length", expectedItemCount);
    }

    // Scroll down to trigger more content if needed
    cy.scrollTo("center");
    cy.wait(waitTime);
    cy.scrollTo("bottom");

    // Verify the final count of loaded items
    const finalItemCount = initialItemCount + scrollCount * 9 - 5;
    cy.get(".shadow-xl").should("have.length", finalItemCount);

    cy.scrollTo("center");
    cy.wait(waitTime);
    cy.scrollTo("bottom");

    cy.get(".text-slate-600").should("be.visible");
  });
});
