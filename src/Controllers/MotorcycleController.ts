import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const Motorcycle: IMotorcycle = {
      id: this.req.body.id,
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status ? this.req.body.status : false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.createMotorcycleDomain(Motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const motorcycles = await this.service.getAllMotorcycles();
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;

    const regex = /^[a-f\d]{24}$/i;
    if (!regex.test(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const motorcycle = await this.service.getById(id);

    if (!motorcycle) {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }

    return this.res.status(200).json(motorcycle);
  }

  public async updateById() {
    const { id } = this.req.params;
    const updateMotorcycle = this.req.body;

    const regex = /^[a-f\d]{24}$/i;
    if (!regex.test(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const motorcycle = await this.service.getById(id);

    if (!motorcycle) {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }

    const motorcycleUpdated = await this.service.updateById(id, updateMotorcycle);

    return this.res.status(200).json(motorcycleUpdated);
  }
}

export default MotorcycleController;