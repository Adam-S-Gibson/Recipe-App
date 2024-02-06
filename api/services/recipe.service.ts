import express, { Response, Request, Router } from "express";
import {
  searchByNameOrIngredient,
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  deleteRecipeById,
} from "../controllers/recipe.controller";
import logger from "../config/logger";
import { Recipe } from "@prisma/client";

const NAMESPACE = "Recipe Service";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({
    msg: "alive",
  });
});

router.get("/recipes", async (req: Request, res: Response) => {
  try {
    let recipes: Partial<Recipe>[];

    if (req.query.search) {
      recipes = await searchByNameOrIngredient(String(req.query.search));
    } else {
      recipes = await getAllRecipes();
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
    const recipe = await getRecipeById(req.params.id);

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
    await addNewRecipe(req.body);

    res.sendStatus(201);
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
    await deleteRecipeById(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    res.status(error.status ?? 500).send(error.message);
    logger.error(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  }
});

export = router;
