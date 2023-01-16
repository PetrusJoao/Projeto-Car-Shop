import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  public async createCarDomain(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    if (car) {
      return new Car({
        id: newCar.id,
        model: newCar.model,
        year: newCar.year,
        color: newCar.color,
        status: newCar.status,
        buyValue: newCar.buyValue,
        doorsQty: newCar.doorsQty,
        seatsQty: newCar.seatsQty,
      });
    }
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const result = await carODM.findAll();
    const cars = result.map((car) => ({
      id: car.id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    }));
    return cars;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (car) {
      return {
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      };
    }
  }

  public async updateById(id: string, carToUpdate: ICar) {
    const carODM = new CarODM();
    const car = await carODM.updateOne(id, carToUpdate);
    if (car) {
      return {
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      };
    }
  }
}

export default CarService;