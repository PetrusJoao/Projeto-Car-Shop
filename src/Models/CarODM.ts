import {
  Model,
  Schema,
  model,
  models,
  // UpdateQuery,
  // isValidObjectId,body
} from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }
  // 
  //   public async update(id: string, obj: Partial<ICars>): Promise<ICars | null> {
  //     if (!isValidObjectId(id)) throw Error('Invalid Mongo id');
  // 
  //     return this.model.findByIdAndUpdate(
  //       { _id: id },
  //       { ...obj } as UpdateQuery<ICars>,
  //       { new: true },
  //     );
  //   }
}

export default CarODM;
