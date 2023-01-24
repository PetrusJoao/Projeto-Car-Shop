import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Testa as rotas relacionadas a carros', function () {
  it('Deve criar um carro no cenário de sucesso', async function () {
    // Arrange
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    Sinon.stub(Model, 'create').resolves(carOutput);
    // Act
    const service = new CarService();
    const result = await service.createCarDomain(carInput);
    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deve listar todos os carros num cenário de sucesso', async function () {
    // Arrange
    const carOutput = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: false,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    Sinon.stub(Model, 'find').resolves(carOutput);
    // Act
    const service = new CarService();
    const result = await service.getAllCars();
    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });
});