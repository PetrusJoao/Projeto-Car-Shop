import {
  Model,
  Schema,
  model,
  models,
  UpdateQuery,
} from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMotorcycle>;

  constructor() {
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: false },
      engineCapacity: { type: Number, required: true },
    });
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }

  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }

  public async findAll() {
    return this.model.find();
  }

  public async findById(id: string) {
    return this.model.findById(id);
  }

  public async updateOne(id: string, obj: Partial<IMotorcycle>): Promise<IMotorcycle | null> {
    return this.model.findOneAndUpdate(
      { id },
      { ...obj } as UpdateQuery<IMotorcycle>,
      { new: true },
    );
  }
}

export default MotorcycleODM;
