import { NextFunction, Request, Response } from 'express';
import ICars from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const Car: ICars = {
      id: this.req.body.id,
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status ? this.req.body.status : false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.createCarDomain(Car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const cars = await this.service.getAllCars();
      return this.res.status(200).json(cars);
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

    const car = await this.service.getById(id);

    if (!car) {
      return this.res.status(404).json({ message: 'Car not found' });
    }

    return this.res.status(200).json(car);
  }
}

export default CarController;