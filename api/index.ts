import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import logger from "./config/logger";
import config from "./config/config";

const app = express();
const NAMESPACE = "Server";

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logger.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });

  next();
});

app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/recipes", (req: Request, res: Response) => {
  res.status(200).send("");
});
app.get("/recipes/:id", (req: Request, res: Response) => {
  res.status(200).send("");
});
app.post("/recipes", (req: Request, res: Response) => {
  res.status(200).send("");
});
app.delete("/recipes/:id", (req: Request, res: Response) => {
  res.status(200).send("");
});

app.listen(config.server.port, () =>
  console.log(`Listening on port ${config.server.port}`)
);
