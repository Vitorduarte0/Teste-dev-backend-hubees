import express from "express";
import { BikeBusiness } from "../business/BikeBusiness";
import { BikeController } from "../controller/BikeController";
import { BikeDataBase } from "../data/BikeDataBase";
import { IdGeneration } from "../services/IdGeneretion";

const idGeneration: IdGeneration = new IdGeneration();
const bikeDataBase: BikeDataBase = new BikeDataBase();
const bikeBussines: BikeBusiness = new BikeBusiness(bikeDataBase, idGeneration);
const bikeController: BikeController = new BikeController(bikeBussines);
export const bikeRouter = express.Router();
bikeRouter.get("/", (req, res) => bikeController.getAllProduct(req, res));
bikeRouter.post("/register", (req, res) =>
  bikeController.registerBike(req, res)
);
bikeRouter.delete("/sell/:id", (req, res) => bikeController.sellBike(req, res));
bikeRouter.put("/editPrice/:id", (req, res) =>
  bikeController.updatePriceOnBike(req, res)
);
