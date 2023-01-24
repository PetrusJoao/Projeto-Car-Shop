import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testa as rotas relacionadas a motos', function () {
  describe('Testa criação de motos', function () {
    it('Deve criar uma moto no cenário de sucesso', async function () {
      // Arrange
      const motorcycleInput: IMotorcycle = {
        model: 'Honda Cb 6000f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const motorcycleOutput = {
        id: '6348513f34c397abcad040b2',
        model: 'Honda Cb 6000f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      Sinon.stub(Model, 'create').resolves(motorcycleOutput);
      // Act
      const service = new MotorcycleService();
      const result = await service.createMotorcycleDomain(motorcycleInput);
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });

  describe('Testa a listagem de todas as motos', function () {
    it('Deve listar todas as motos num cenário de sucesso', async function () {
      // Arrange
      const motorcycleOutput = [
        {
          id: '634852326b35b59438fbea2f',
          model: 'Honda Cb 600f Hornet',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Honda Cbr 1100rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      ];

      Sinon.stub(Model, 'find').resolves(motorcycleOutput);
      // Act
      const service = new MotorcycleService();
      const result = await service.getAllMotorcycles();
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });

  describe('Testa listar motos por id', function () {
    it('Deve listar um moto por id num cenário de sucesso', async function () {
      // Arrange
      const motorcycleOutput = {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      Sinon.stub(Model, 'findById').resolves(motorcycleOutput);
      // Act
      const service = new MotorcycleService();
      const result = await service.getById('634852326b35b59438fbea2f');
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
    it('Deve falhar listar um moto por id', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves([]);
      // Act
      const service = new MotorcycleService();
      const result = await service.getById('634852326b35b59438f12345');
      // Assert
      expect(result?.id).to.be.deep.equal(undefined);
    });
  });

  describe('Testa atualizar motos por id', function () {
    it('Deve atualizar um moto por id num cenário de sucesso', async function () {
      // Arrange
      const motorcycleInput = {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      };
      const motorcycleOutput = {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      };

      Sinon.stub(Model, 'findOneAndUpdate').resolves(motorcycleInput);
      // Act
      const service = new MotorcycleService();
      const result = await service.updateById('634852326b35b59438fbea2f', motorcycleInput);
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });

  afterEach(function () {
    Sinon.restore();
  });
});