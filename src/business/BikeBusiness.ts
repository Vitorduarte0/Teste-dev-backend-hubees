import { CustomError } from "../error/CustomError";
import { Bike, IBikeDTO } from "../interface/IBike";
import { IBikeDataBase } from "../interface/IBikeDataBase";
import { IdGeneration } from "../services/IdGeneretion";
import { query } from "../types/query";

export class BikeBusiness {
  constructor(
    private bikeDataBase: IBikeDataBase,
    private idGeneration: IdGeneration
  ) {}
  registerBikeBusiness = async (bikeDTO: IBikeDTO): Promise<void> => {
    const { color, numberOfMarches, brand, model, price } = bikeDTO;
    if (!color || !numberOfMarches || !brand || !model || !price) {
      throw new CustomError(
        "Por favor verifique se todos campos foram preenchidos",
        422
      );
    }
    const id = this.idGeneration.generationId();
    const isVerifyExistProduct = await this.bikeDataBase.getProductById(id);
    if (isVerifyExistProduct) {
      throw new CustomError(
        "Essa bicicleta já está registrada no sistema",
        401
      );
    }
    await this.bikeDataBase.getAllProductDateBase();
    const bike: Bike = {
      id,
      color,
      numberOfMarches,
      model,
      brand,
      price,
    };
    await this.bikeDataBase.registerBikeDataBase(bike);
  };
  getAllProductBusiness = async (queryDTO: query): Promise<Bike[]> => {
    const { color, price } = queryDTO;
    const bike = await this.bikeDataBase.getAllProductDateBase();
    const newBike = bike
      .filter((bike) => {
        if (price && color) {
          return (
            bike.color.toLowerCase() === color.toLowerCase() &&
            bike.price === price
          );
        }
        if (color) {
          return bike.color.toLowerCase() === color.toLowerCase();
        }
        if (price) {
          return bike.price === price;
        } else {
          return bike;
        }
      })
      .map((bike) => {
        return bike;
      });
      if(newBike.length <=0){
        throw new CustomError("Produto não encontrado", 404)
      }

    return newBike;
  };
  sellBikeBusiness = async (id: string): Promise<void> => {
    const isVerifyExistProduct = await this.bikeDataBase.getProductById(id);
    if (!isVerifyExistProduct) {
      throw new CustomError(
        "Essa bicicleta não está registrada no sistema",
        401
      );
    }
    await this.bikeDataBase.sellBikeDataBase(id);
  };
  updatePriceOnBikeBunisess = async (
    id: string,
    newPrice: number
  ): Promise<void> => {
    const isVerifyExistProduct = await this.bikeDataBase.getProductById(id);
    if (!isVerifyExistProduct) {
      throw new CustomError(
        "Essa bicicleta não está registrada no sistema",
        401
      );
    }
    await this.bikeDataBase.updatePriceOnBikeDataBase(id, newPrice);
  };
}
