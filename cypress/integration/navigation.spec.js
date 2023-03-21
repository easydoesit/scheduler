describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");

  });

  it("should book an interview", () => {
    cy.visit("/");


    //cy.get(".appointment")
    //.children().eq(0);
    //.find(".appointment").eq(1)
    cy.get("[alt=Add]", { timeout: 10000 }).eq(1)
      .click()
      .should("have.placeholder", /enter student name/i);


  })

  it("should edit an interview", () => {
    cy.visit("/");

    cy.get(".appointment").children().find("Archie Cohen").invoke("show")


    // cy.get("[alt=Edit]")
    //   .click();
  })
});