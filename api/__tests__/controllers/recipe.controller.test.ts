import {
  addNewRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipeById,
  searchByNameOrIngredient,
} from "../../controllers/recipe.controller";

import { Recipe } from "@prisma/client";
import { PrismockClient } from "prismock";
import { PrismockClientType } from "prismock/build/main/lib/client";

jest.mock("@prisma/client", () => {
  return {
    ...jest.requireActual("@prisma/client"),
    PrismaClient: jest.requireActual("prismock").PrismockClient,
  };
});

describe("Prisma db operation tests", () => {
  let prismock: PrismockClientType;
  let id: string;

  const mockRecipe: Recipe[] = [
    {
      id: "1",
      name: "Pasta",
      time_to_make: "30",
      prep_time: "10",
      created_at: new Date(),
    },
    {
      id: "2",
      name: "Salad",
      time_to_make: "15",
      prep_time: "5",
      created_at: new Date(),
    },
  ];

  beforeAll(async () => {
    prismock = new PrismockClient() as PrismockClientType;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addNewRecipe", () => {
    test("should create a recipe", async () => {
      const recipe = {
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
      };

      const mockAdd = addNewRecipe(recipe);
      id = (await mockAdd).id;

      await expect(mockAdd).resolves.toEqual({
        id: expect.any(String),
        name: "apple pie",
        time_to_make: "10",
        prep_time: "5",
        created_at: expect.any(Date),
      });
    });

    test("should not create a recipe with missing fields", async () => {
      const recipe = {
        name: "apple pie",
        time_to_make: "10",
        // missing prep_time
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
      };

      // @ts-ignore
      await expect(addNewRecipe(recipe)).rejects.toThrow();
    });
  });

  describe("getAllRecipes", () => {
    test("should get all recipes", async () => {
      addNewRecipe({
        ...mockRecipe[0],
        ingredients: [],
        steps: [],
      });
      addNewRecipe({
        ...mockRecipe[0],
        ingredients: [],
        steps: [],
      });
      await expect(getAllRecipes()).resolves.toHaveLength(3);
    });
  });

  describe("getRecipeById", () => {
    test("should get a recipe by id", async () => {
      const result = await getRecipeById(id);
      expect(result).toEqual({
        id: expect.any(String),
        name: "apple pie",
        time_to_make: "10",
        prep_time: "5",
        ingredients: [
          {
            amount: "200g",
            id: expect.any(String),
            name: "apples",
            recipeId: expect.any(String),
          },
        ],
        steps: [
          {
            description: "Put all the apples in",
            id: expect.any(String),
            recipeId: expect.any(String),
          },
        ],
      });
    });
  });

  describe("searchByNameOrIngredient", () => {
    test("should be able to search a recipe by name or ingredient", async () => {
      const searchTerm = "apple";

      const result = await searchByNameOrIngredient(searchTerm);

      expect(result).toEqual([
        {
          id: expect.any(String),
          name: "apple pie",
          time_to_make: "10",
          ingredients: [
            {
              amount: "200g",
              id: expect.any(String),
              name: "apples",
              recipeId: expect.any(String),
            },
          ],
        },
      ]);
    });
  });

  describe("deleteRecipeById", () => {
    test("should delete a record", async () => {
      const result = await deleteRecipeById(id);

      expect(result).toEqual({
        id: expect.any(String),
        name: "apple pie",
        time_to_make: "10",
        prep_time: "5",
        created_at: expect.any(Date),
      });
    });

    test("should not delete a recipe by invalid id", async () => {
      const invalidId = "invalid-id";
      await expect(deleteRecipeById(invalidId)).rejects.toThrow();
    });
  });
});
