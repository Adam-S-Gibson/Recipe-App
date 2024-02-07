// <reference types="cypress" />

const recipe = {
  name: "Chocolate Chip Cookies",
  prepTime: "5",
  cookTime: "10",
  ingredients: [
    {
      name: "Flour",
      amount: "100g",
    },
    {
      name: "Eggs",
      amount: "3",
    },
    {
      name: "Chocolate Chips",
      amount: "50g",
    },
  ],
  steps: [
    {
      desc: "mix",
    },
    {
      desc: "bake",
    },
  ],
};

describe("Recipe UI tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it(`should save a new recipe when all details are provided`, () => {
    cy.get("#addRecipe").click();
    cy.get("#recipeName").type(recipe.name);
    cy.get("#recipePrepTime").type(recipe.prepTime);
    cy.get("#recipeCookTime").type(recipe.cookTime);
    recipe.ingredients.forEach((ingredient) => {
      cy.get("#recipeIngredientName").type(ingredient.name);
      cy.get("#recipeIngredientAmount").type(ingredient.amount);
      cy.get("#addIngredient").click();
    });

    recipe.steps.forEach((step) => {
      cy.get("#recipeStepDescription").type(step.desc);
      cy.get("#addStep").click();
    });
    cy.get("#submit").click();

    cy.url().should("not.include", "add-recipe");
    cy.contains(recipe.name).should("have.text", recipe.name);
  });

  it(`should find a recipe by name and display its details`, () => {
    cy.get("#searchBar").type("Chocolate");
    cy.contains(recipe.name).should("have.text", recipe.name);

    cy.get("#viewRecipeButton").first().click();
    cy.contains(recipe.name).should("have.text", recipe.name);
    cy.contains(recipe.cookTime).should("contain.text", recipe.cookTime);
    cy.contains(recipe.prepTime).should("contain.text", recipe.prepTime);
    recipe.ingredients.forEach((ingredient) => {
      cy.contains(ingredient.name).should("contain.text", ingredient.name);
      cy.contains(ingredient.amount).should("contain.text", ingredient.amount);
    });

    recipe.steps.forEach((step) => {
      cy.contains(step.desc).should("have.text", step.desc);
    });
  });

  it(`should find a recipe by ingredient and display its details`, () => {
    cy.get("#searchBar").type("Eggs");
    cy.contains(recipe.name).should("have.text", recipe.name);

    cy.get("#viewRecipeButton").first().click();
    cy.contains(recipe.name).should("have.text", recipe.name);
    cy.contains(recipe.cookTime).should("contain.text", recipe.cookTime);
    cy.contains(recipe.prepTime).should("contain.text", recipe.prepTime);
    recipe.ingredients.forEach((ingredient) => {
      cy.contains(ingredient.name).should("contain.text", ingredient.name);
      cy.contains(ingredient.amount).should("contain.text", ingredient.amount);
    });

    recipe.steps.forEach((step) => {
      cy.contains(step.desc).should("have.text", step.desc);
    });
  });

  it(`should remove a recipe when delete button is clicked`, () => {
    cy.get("#viewRecipeButton").first().click();
    cy.get("#removeButton").click();
    cy.get("#deleteButton").click();
    cy.url().should("not.include", "view-recipe");
    cy.should("not.include", recipe.name);
  });
});
