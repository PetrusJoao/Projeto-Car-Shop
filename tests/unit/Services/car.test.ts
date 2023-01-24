import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Testa as rotas relacionadas a carros', function () {
  describe('Testa criação de carros', function () {
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
  });
  describe('Testa a listagem de todos os carros', function () {
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
  describe('Testa listar carros por id', function () {
    it('Deve listar um carro por id num cenário de sucesso', async function () {
      // Arrange
      const carOutput = {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };

      Sinon.stub(Model, 'findById').resolves(carOutput);
      // Act
      const service = new CarService();
      const result = await service.getById('634852326b35b59438fbea31');
      // Assert
      expect(result).to.be.deep.equal(carOutput);
    });
    it('Deve falhar listar um carro por id', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves([]);
      // Act
      const service = new CarService();
      const result = await service.getById('634852326b35b59438f12345');
      // Assert
      expect(result?.id).to.be.deep.equal(undefined);
    });
  });

  describe('Testa atualizar carros por id', function () {
    it('Deve atualizar um carro por id num cenário de sucesso', async function () {
      // Arrange
      const carInput = {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 12.000,
        doorsQty: 2,
        seatsQty: 5,
      };
      const carOutput = {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 12.000,
        doorsQty: 2,
        seatsQty: 5,
      };

      Sinon.stub(Model, 'findOneAndUpdate').resolves(carInput);
      // Act
      const service = new CarService();
      const result = await service.updateById('634852326b35b59438fbea2f', carInput);
      // Assert
      expect(result).to.be.deep.equal(carOutput);
    });
  });

  afterEach(function () {
    Sinon.restore();
  });
});