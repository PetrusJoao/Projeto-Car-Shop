import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  public async createMotorcycleDomain(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    if (motorcycle) {
      return new Motorcycle({
        id: newMotorcycle.id,
        model: newMotorcycle.model,
        year: newMotorcycle.year,
        color: newMotorcycle.color,
        status: newMotorcycle.status,
        buyValue: newMotorcycle.buyValue,
        category: newMotorcycle.category,
        engineCapacity: newMotorcycle.engineCapacity,
      });
    }
  }

  public async getAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.findAll();
    const motorcycles = result.map((motorcycle) => ({
      id: motorcycle.id,
      model: motorcycle.model,
      year: motorcycle.year,
      color: motorcycle.color,
      status: motorcycle.status,
      buyValue: motorcycle.buyValue,
      category: motorcycle.category,
      engineCapacity: motorcycle.engineCapacity,
    }));
    return motorcycles;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (motorcycle) {
      return {
        id: motorcycle.id,
        model: motorcycle.model,
        year: motorcycle.year,
        color: motorcycle.color,
        status: motorcycle.status,
        buyValue: motorcycle.buyValue,
        category: motorcycle.category,
        engineCapacity: motorcycle.engineCapacity,
      };
    }
  }

  public async updateById(id: string, motorcycleToUpdate: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.updateOne(id, motorcycleToUpdate);
    if (motorcycle) {
      return {
        id: motorcycle.id,
        model: motorcycle.model,
        year: motorcycle.year,
        color: motorcycle.color,
        status: motorcycle.status,
        buyValue: motorcycle.buyValue,
        category: motorcycle.category,
        engineCapacity: motorcycle.engineCapacity,
      };
    }
  }
}

export default MotorcycleService;