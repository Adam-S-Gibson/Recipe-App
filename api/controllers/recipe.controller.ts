import { Ingredients, Steps, Recipe } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

type RecipeInput = Omit<Recipe, "id" | "created_at">;
type IngredientsInput = Omit<Ingredients, "id" | "created_at" | "recipeId">;
type StepsInput = Omit<Steps, "id" | "created_at" | "recipeId">;

export type CreateRecipeInput = RecipeInput & {
  ingredients: IngredientsInput[];
  steps: StepsInput[];
};

export const getAllRecipes = async () => {
  try {
    return await prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        time_to_make: true,
        prep_time: true,
      },
    });
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    throw error;
  }
};

export const searchByNameOrIngredient = async (searchQuery: string) => {
  try {
    return await prisma.recipe.findMany({
      where: {
        OR: [
          {
            name: { contains: searchQuery, mode: "insensitive" },
          },
          {
            ingredients: {
              some: {
                name: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        time_to_make: true,
        ingredients: true,
      },
    });
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};

export const getRecipeById = async (id: string) => {
  try {
    return await prisma.recipe.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        time_to_make: true,
        prep_time: true,
        ingredients: true,
        steps: true,
      },
    });
  } catch (error) {
    console.error(`Error retrieving recipe with id ${id}:`, error);
    throw error;
  }
};

export const addNewRecipe = async (recipe: CreateRecipeInput) => {
  if (
    !recipe.name ||
    !recipe.time_to_make ||
    !recipe.prep_time ||
    !recipe.ingredients ||
    !recipe.steps
  ) {
    throw new Error("Missing required fields");
  }
  try {
    return await prisma.recipe.create({
      data: {
        name: recipe.name,
        time_to_make: recipe.time_to_make,
        prep_time: recipe.prep_time,
        ingredients: {
          createMany: {
            data: recipe.ingredients,
          },
        },
        steps: {
          createMany: {
            data: recipe.steps,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error creating new recipe:", error);
    throw error;
  }
};

export const updateRecipeById = async (
  id: string,
  recipe: CreateRecipeInput
) => {
  if (
    !recipe.name ||
    !recipe.time_to_make ||
    !recipe.prep_time ||
    !recipe.ingredients ||
    !recipe.steps
  ) {
    throw new Error("Missing required fields");
  }
  try {
    return await prisma.recipe.update({
      where: { id: id },
      data: {
        name: recipe.name,
        time_to_make: recipe.time_to_make,
        prep_time: recipe.prep_time,
        ingredients: {
          deleteMany: {},
          createMany: {
            data: recipe.ingredients,
          },
        },
        steps: {
          deleteMany: {},
          createMany: {
            data: recipe.steps,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error updating recipe with id ${id}:`, error);
    throw error;
  }
};

export const deleteRecipeById = async (id: string) => {
  try {
    return await prisma.recipe.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error(`Error deleting recipe with id ${id}:`, error);
    throw error;
  }
};
