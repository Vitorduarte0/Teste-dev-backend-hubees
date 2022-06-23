import { CustomError } from "../error/CustomError";
import { Request, Response } from "express";
import { IBikeDTO } from "../interface/IBike";
import { BikeBusiness } from "../business/BikeBusiness";
import { query } from "../types/query";

export class BikeController {
  constructor(private bikeBussines: BikeBusiness) {}
  registerBike = async (req: Request, res: Response): Promise<void> => {
    try {
      const { color, numberOfMarches, brand, model, price } = req.body;
      const bikeDTO: IBikeDTO = {
        color,
        numberOfMarches,
        brand,
        model,
        price,
      };
      await this.bikeBussines.registerBikeBusiness(bikeDTO);
      res.status(201).send({ message: "Bicicleta registrada com sucesso!" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ message: error.message });
      } else if (error) {
        res.status(error).send({ error });
      } else {
        res.status(500).send({ message: "Erro ao se conectar ao servidor" });
      }
    }
  };
  getAllProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const color = req.query.color as string;
      const price = req.query.price;
      const newPrice = Number(price)
      const queryDTO: query = {
        color, price: newPrice
      }
      const product = await this.bikeBussines.getAllProductBusiness(
        queryDTO
      );

      res.send({ product });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ message: error.message });
      } else if (error) {
        res.status(error).send({ error });
      } else {
        res.status(500).send({ message: "Erro ao se conectar ao servidor" });
      }
    }
  };
  sellBike = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      await this.bikeBussines.sellBikeBusiness(id);
      res.send({ message: "Bike vendida com sucesso!" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ message: error.message });
      } else if (error) {
        res.status(error).send({ error });
      } else {
        res.status(500).send({ message: "Erro ao se conectar ao servidor" });
      }
    }
  };
  updatePriceOnBike = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const price = req.body.price;
      await this.bikeBussines.updatePriceOnBikeBunisess(id, price);
      res.send({ message: "Preço atualizado com sucesso!" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ message: error.message });
      } else if (error) {
        res.status(error).send({ error });
      } else {
        res.status(500).send({ message: "Erro ao se conectar ao servidor" });
      }
    }
  };
}
