import express, { Response, Request } from "express";
import recipeController from "../controllers/recipe.controller";
import logger from "../config/logger";
import { Recipe } from "@prisma/client";

const NAMESPACE = "Recipe Service";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({
    msg: "alive",
  });
});

router.get("/recipes", async (req: Request, res: Response) => {
  let recipes: Partial<Recipe>[];

  try {
    if (req?.query?.search) {
      recipes = await recipeController.searchByNameOrIngredient(
        String(req.query.search)
      );
    } else {
      recipes = await recipeController.getAllRecipes();
    }

    res.status(200).send(recipes);
  } catch (error) {
    res.status(error.status ?? 500).send(error.message);
    logger.error(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  }
});

router.get("/recipes/:id", async (req: Request, res: Response) => {
  try {
    const recipe = await recipeController.getRecipeById(req.params.id);

    res.status(200).send(recipe);
  } catch (error) {
    res.status(error.status ?? 500).send(error.message);
    logger.error(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  }
});

router.post("/recipes", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    await recipeController.addNewRecipe(req.body);

    res.send(201);
  } catch (error) {
    res.status(error.status ?? 500).send(error.message);
    logger.error(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  }
});

router.delete("/recipes/:id", async (req: Request, res: Response) => {
  try {
    await recipeController.deleteRecipeById(req.params.id);

    res.send(204);
  } catch (error) {
    res.status(error.status ?? 500).send(error.message);
    logger.error(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  }
});

export = router;
