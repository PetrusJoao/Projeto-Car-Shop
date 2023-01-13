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
}

export default CarService;