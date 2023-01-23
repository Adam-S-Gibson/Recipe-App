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
  it(`Given I have a new recipe
      When I add the new recipe name
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`, () => {
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

  it(`Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
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

  it(`Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
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

  it(`Given I want to remove a recipe
      When I search for the recipe by name
      Then I find the recipe
      and I can see the recipe
      I am able to delete the recipe`, () => {
    cy.get("#viewRecipeButton").first().click();
    cy.get("#removeButton").click();
    cy.get("#deleteButton").click();
    cy.url().should("not.include", "view-recipe");
    cy.should("not.include", recipe.name);
  });
});
