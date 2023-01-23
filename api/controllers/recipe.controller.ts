import { PrismaClient, Ingredients, Steps, Prisma } from "@prisma/client";

const db: PrismaClient = new PrismaClient();

const getAllRecipes = async () => {
  const recipes = await db.recipe.findMany({
    select: {
      id: true,
      name: true,
      time_to_make: true,
      prep_time: true,
    },
  });
  return recipes;
};

const searchByNameOrIngredient = async (searchQuery: string) => {
  const recipes = await db.recipe.findMany({
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
  return recipes;
};

const getRecipeById = async (id: string) => {
  const recipes = await db.recipe.findFirst({
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
  return recipes;
};

const addNewRecipe = async (recipe: {
  name: string;
  time_to_make: string;
  prep_time: string;
  ingredients: Ingredients[];
  steps: Steps[];
}) => {
  return db.recipe.create({
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
};

const deleteRecipeById = async (id: string) => {
  return db.recipe.delete({
    where: { id: id },
  });
};

export default {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  deleteRecipeById,
  searchByNameOrIngredient,
};
