// <reference types="cypress" />

describe("Express API tests", () => {
  it(`Should Create an entry within the database`, () => {
    cy.request("POST", "http://localhost:3080/api/recipes", {
      name: "apple pie",
      time_to_make: "10",
      prep_time: "5",
      ingredients: [
        {
          name: "apples",
          amount: "200g",
        },
      ],
      steps: [
        {
          description: "Put all the apples in",
        },
      ],
    }).then((res) => {
      expect(res.status).to.equal(201);
    });
  });

  it(`Should be able to get all entries`, () => {
    cy.request(`http://localhost:3080/api/recipes`).then((res) => {
      expect(res.status).to.equal(200);
    });
  });

  it(`Should be able to get an entry by it's ID`, () => {
    cy.request(`http://localhost:3080/api/recipes`).then((res) => {
      cy.request(`http://localhost:3080/api/recipes/${res.body[0].id}`).then(
        (res) => {
          expect(res.status).to.equal(200);
        }
      );
    });
  });

  it(`Should be able to delete an entry by ID`, () => {
    cy.request(`http://localhost:3080/api/recipes`).then((res) => {
      cy.request(
        "DELETE",
        `http://localhost:3080/api/recipes/${res.body[0].id}`
      ).then((res) => {
        expect(res.status).to.equal(204);
      });
    });
  });
});
