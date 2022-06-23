import { Bike } from "./IBike";

export interface IBikeDataBase {
  registerBikeDataBase(bike: Bike): Promise<void>;
  getAllProductDateBase(): Promise<Bike[]>;
  getProductById(id: string): Promise<Bike>;
  sellBikeDataBase(id: string): Promise<void>;
  updatePriceOnBikeDataBase(id: string, newPrice:number): Promise<void>;
}
