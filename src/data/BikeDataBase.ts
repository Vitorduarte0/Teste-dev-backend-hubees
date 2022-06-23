import { Bike } from "../interface/IBike";
import { IBikeDataBase } from "../interface/IBikeDataBase";

import { BaseDataBase } from "./BaseDataBase";

export class BikeDataBase extends BaseDataBase implements IBikeDataBase {
  private TABLE_NAME: string = "bike";
  registerBikeDataBase = async (bike: Bike): Promise<void> => {
    await this.getConnection().insert(bike).into(this.TABLE_NAME);
  };
  getProductById = async (id: string): Promise<Bike> => {
    const results = await this.getConnection()
      .from(this.TABLE_NAME)
      .where({ id });
    return results[0];
  };
  getAllProductDateBase = async (): Promise<Bike[]> => {
    const results = await this.getConnection().from(this.TABLE_NAME);
    return results;
  };
  sellBikeDataBase = async (id: string): Promise<void> => {
    await this.getConnection().from(this.TABLE_NAME).del().where({ id });
  };
  updatePriceOnBikeDataBase = async (id: string, newPrice:number): Promise<void> => {
    await this.getConnection().from(this.TABLE_NAME).update({price: newPrice}).where({ id });
  };
}
