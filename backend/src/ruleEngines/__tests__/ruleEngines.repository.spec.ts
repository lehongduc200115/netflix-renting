import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
  GET_LIST_DEFAULT_LIMIT,
  GET_LIST_DEFAULT_PAGE
} from '../../common/constant';
import { SortFieldEnum, SortTypeEnum, Status } from '../../common/enum';
import { IPaginationParams } from '../../common/interface';
import { RuleEngineModel } from '../ruleEngines.model';
import ruleEngineRepository from '../ruleEngines.repository';
import { ruleEnginModel } from './__mocks__/ruleEngines.data';

jest.mock('mongoose', () => {
  const mongoose = jest.requireActual('mongoose');
  return new mongoose.Mongoose(); // new mongoose instance and connection for each test
});

describe('ruleEngines.repository', () => {
  let mongod: MongoMemoryServer;
  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoDbUri = await mongod.getUri();
    await mongoose.connect(mongoDbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  });

  afterEach(async () => {
    expect.hasAssertions();
    jest.clearAllMocks();
    await RuleEngineModel.deleteMany({});
  });

  afterAll(async () => {
    await mongod.stop();
    await mongoose.connection.close();
  });

  describe('#create rule', () => {
    it('should create a new rule', async () => {
      const response = await ruleEngineRepository.create(ruleEnginModel);

      expect(response).toBeDefined();
    });
  });

  describe('#rule getList', () => {
    it('should get list of rule', async () => {
      await RuleEngineModel.create(ruleEnginModel);
      const pagination: IPaginationParams = {
        limit: GET_LIST_DEFAULT_LIMIT,
        page: GET_LIST_DEFAULT_PAGE,
        sortField: SortFieldEnum.UPDATED_AT,
        sortType: SortTypeEnum.ASCENDING,
        offset: GET_LIST_DEFAULT_LIMIT * GET_LIST_DEFAULT_PAGE
      };
      const response = await ruleEngineRepository.getList({}, pagination);
      expect(response).toHaveLength(1);
    });
  });

  describe('#getListWithoutPaginate', () => {
    it('should get list of rule', async () => {
      await RuleEngineModel.create(ruleEnginModel);
      const response = await ruleEngineRepository.getListWithoutPaginate({});
      expect(response).toHaveLength(1);
    });
  });

  describe('#countByParameter', () => {
    it('should get count rule with conditions', async () => {
      await RuleEngineModel.create(ruleEnginModel);
      const response = await ruleEngineRepository.countByParameter({
        status: Status.ACTIVE
      });
      expect(response).toEqual(1);
    });
  });

  describe('#getById', () => {
    it('should get the first rule with conditions', async () => {
      const rule = await RuleEngineModel.create(ruleEnginModel);
      const response = await ruleEngineRepository.getById(rule._id);
      expect(response).toBeDefined();
    });
  });

  describe('#getPlainById', () => {
    it('should get the first rule with conditions', async () => {
      const rule = await RuleEngineModel.create(ruleEnginModel);
      const response = await ruleEngineRepository.getPlainById(rule._id);
      expect(response).toBeDefined();
    });
  });

  describe('#findOneAndUpdateById', () => {
    it('should update rule', async () => {
      const rule = await RuleEngineModel.create(ruleEnginModel);

      const updateRule = await ruleEngineRepository.findOneAndUpdateByIdAndBrandId(
        rule._id,
        'brandId',
        {
          name: 'test1'
        }
      );
      expect(updateRule).toBeDefined();
      expect(updateRule?.name).toEqual('test1');
    });
  });

  describe('#deleteOne', () => {
    it('should delete rule', async () => {
      const rule = await RuleEngineModel.create(ruleEnginModel);
      const response = await ruleEngineRepository.deleteOne(rule._id);
      expect(response).toEqual(true);
    });
  });

  describe('#deleteMany', () => {
    it('should delete rule', async () => {
      const rule = await RuleEngineModel.create(ruleEnginModel);
      const response = await ruleEngineRepository.deleteMany([rule._id]);
      expect(response).toEqual(true);
    });
  });
});
