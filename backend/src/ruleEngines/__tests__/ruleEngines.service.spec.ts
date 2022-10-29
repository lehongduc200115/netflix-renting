import {
  GET_LIST_DEFAULT_LIMIT,
  GET_LIST_DEFAULT_PAGE,
  GET_LIST_DEFAULT_SORT_TYPE
} from '../../common/constant';
import { SortFieldEnum, Status } from '../../common/enum';
import { AppError } from '../../common/error/AppError';
import { IPaginationParams } from '../../common/interface';
import commonUtil from '../../common/util';
import ruleEngineRepository from '../ruleEngines.repository';
import ruleEngineService from '../ruleEngines.service';
import {
  DayOfMonthExpectedModel,
  DayOfMonthRuleModel,
  PointExchangeExpectedModel,
  PointExchangeRuleModel,
  ProfileCompletionRuleModel,
  ReferralExpectedModel,
  ReferralRuleModel,
  ruleEnginExpected,
  ruleEnginInput,
  ruleEnginModel,
  ruleEnginUpdateModel,
  ruleEnginProfileCompletionExpected,
  ruleQuery
} from './__mocks__/ruleEngines.data';

jest.mock('../ruleEngines.repository');

describe('ruleEngines.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
    expect.hasAssertions();
  });

  describe('#create rule by id', () => {
    it('should call create successfully', async () => {
      ruleEngineRepository.create = jest
        .fn()
        .mockResolvedValueOnce(ruleEnginModel);
      const result = await ruleEngineService.create(ruleEnginInput);

      expect(ruleEngineRepository.create).toHaveBeenCalled();
      expect(result).toEqual(ruleEnginModel);
    });
    it('should call create fail', async () => {
      ruleEngineRepository.create = jest
        .fn()
        .mockRejectedValueOnce(new Error());
      const error = await ruleEngineService
        .create(ruleEnginInput)
        .catch(e => e);

      expect(ruleEngineRepository.create).toHaveBeenCalled();
      expect(error).toBeInstanceOf(AppError);
    });
    it('should create POINT_EXCHANGE rule successfully', async () => {
      ruleEngineRepository.create = jest
        .fn()
        .mockResolvedValueOnce(PointExchangeExpectedModel);

      const result = await ruleEngineService.create(PointExchangeRuleModel);
      expect(result).toEqual(PointExchangeExpectedModel);
    });
    it('should create REFERRAL rule successfully', async () => {
      ruleEngineRepository.create = jest
        .fn()
        .mockResolvedValueOnce(ReferralExpectedModel);

      const result = await ruleEngineService.create(ReferralRuleModel);
      expect(result).toEqual(ReferralExpectedModel);
    });
    it('should create DAY_OF_MONTH recurring rule successfully', async () => {
      ruleEngineRepository.create = jest
        .fn()
        .mockResolvedValueOnce(DayOfMonthExpectedModel);

      const result = await ruleEngineService.create(DayOfMonthRuleModel);
      expect(result).toEqual(DayOfMonthExpectedModel);
    });
  });

  describe('#Get rule list', () => {
    it('should call get list successfully', async () => {
      const paginationParams: IPaginationParams = {
        limit: GET_LIST_DEFAULT_LIMIT,
        page: GET_LIST_DEFAULT_PAGE,
        sortField: SortFieldEnum.UPDATED_AT,
        sortType: GET_LIST_DEFAULT_SORT_TYPE,
        offset: GET_LIST_DEFAULT_LIMIT * (GET_LIST_DEFAULT_PAGE - 1)
      };

      ruleEngineRepository.getList = jest
        .fn()
        .mockResolvedValueOnce([{ toObject: () => ruleEnginExpected }]);
      ruleEngineRepository.countByParameter = jest
        .fn()
        .mockResolvedValueOnce(1);
      commonUtil.getPaginationParams = jest
        .fn()
        .mockReturnValueOnce(paginationParams);

      const result = await ruleEngineService.getList(ruleQuery);

      expect(ruleEngineRepository.getList).toHaveBeenCalledWith(
        {
          status: Status.ACTIVE
        },
        paginationParams
      );
      expect(result).toEqual({
        items: [ruleEnginExpected],
        pagination: {
          totalItems: 1,
          page: GET_LIST_DEFAULT_PAGE,
          totalPages: 1,
          limit: GET_LIST_DEFAULT_LIMIT
        }
      });
    });
    it('should call get list without filter status successfully', async () => {
      const paginationParams: IPaginationParams = {
        limit: GET_LIST_DEFAULT_LIMIT,
        page: GET_LIST_DEFAULT_PAGE,
        sortField: SortFieldEnum.UPDATED_AT,
        sortType: GET_LIST_DEFAULT_SORT_TYPE,
        offset: GET_LIST_DEFAULT_LIMIT * (GET_LIST_DEFAULT_PAGE - 1)
      };

      ruleEngineRepository.getList = jest
        .fn()
        .mockResolvedValueOnce([{ toObject: () => ruleEnginExpected }]);
      ruleEngineRepository.countByParameter = jest
        .fn()
        .mockResolvedValueOnce(1);
      commonUtil.getPaginationParams = jest
        .fn()
        .mockReturnValueOnce(paginationParams);

      const result = await ruleEngineService.getList({
        ...ruleQuery,
        status: undefined
      });

      expect(ruleEngineRepository.getList).toHaveBeenCalledWith(
        {},
        paginationParams
      );
      expect(result).toEqual({
        items: [ruleEnginExpected],
        pagination: {
          totalItems: 1,
          page: GET_LIST_DEFAULT_PAGE,
          totalPages: 1,
          limit: GET_LIST_DEFAULT_LIMIT
        }
      });
    });
    it('should call get list without filter status successfully', async () => {
      const paginationParams: IPaginationParams = {
        limit: GET_LIST_DEFAULT_LIMIT,
        page: GET_LIST_DEFAULT_PAGE,
        sortField: SortFieldEnum.UPDATED_AT,
        sortType: GET_LIST_DEFAULT_SORT_TYPE,
        offset: GET_LIST_DEFAULT_LIMIT * (GET_LIST_DEFAULT_PAGE - 1)
      };

      ruleEngineRepository.getList = jest
        .fn()
        .mockResolvedValueOnce([{ toObject: () => ruleEnginExpected }]);
      ruleEngineRepository.countByParameter = jest
        .fn()
        .mockResolvedValueOnce(1);
      commonUtil.getPaginationParams = jest
        .fn()
        .mockReturnValueOnce(paginationParams);

      const result = await ruleEngineService.getList({
        ...ruleQuery,
        status: undefined
      });

      expect(ruleEngineRepository.getList).toHaveBeenCalledWith(
        {},
        paginationParams
      );
      expect(result).toEqual({
        items: [ruleEnginExpected],
        pagination: {
          totalItems: 1,
          page: GET_LIST_DEFAULT_PAGE,
          totalPages: 1,
          limit: GET_LIST_DEFAULT_LIMIT
        }
      });
    });
  });

  describe('#Extract rules from ruleIds', () => {
    it('should extract successfully', async () => {
      const ruleEngineDocument = JSON.parse(JSON.stringify(ruleEnginInput));
      (ruleEngineDocument as any).toObject = () => ruleEnginInput;
      ruleEngineRepository.getByIds = jest
        .fn()
        .mockResolvedValue([ruleEngineDocument]);
      const testInputList = ['a'];
      const result = await ruleEngineService.extractList(testInputList);
      expect(result).toHaveLength(testInputList.length);
    });
  });

  describe('#Get rule list by ruleIds', () => {
    it('should call get list successfully', async () => {
      ruleEngineRepository.getListWithoutPaginate = jest
        .fn()
        .mockResolvedValueOnce([ruleEnginInput]);
      const result = await ruleEngineService.getListByRuleIds([]);

      expect(ruleEngineRepository.getListWithoutPaginate).toHaveBeenCalledWith({
        _id: { $in: [] }
      });
      expect(result).toEqual([ruleEnginInput]);
    });
  });

  describe('#Get rule list by ruleIds', () => {
    it('should call get list successfully', async () => {
      ruleEngineRepository.getListWithoutPaginate = jest
        .fn()
        .mockResolvedValueOnce([ruleEnginInput]);
      const result = await ruleEngineService.getListByRuleIds([]);

      expect(ruleEngineRepository.getListWithoutPaginate).toHaveBeenCalledWith({
        _id: { $in: [] }
      });
      expect(result).toEqual([ruleEnginInput]);
    });
  });

  describe('#Get rule by id', () => {
    it('should call get detail successfully', async () => {
      ruleEngineRepository.getById = jest
        .fn()
        .mockResolvedValueOnce(ruleEnginInput);
      const result = await ruleEngineService.getById('123');

      expect(ruleEngineRepository.getById).toHaveBeenCalledWith('123');
      expect(result).toEqual(ruleEnginInput);
    });
    it('should call get detail fail', async () => {
      ruleEngineRepository.getById = jest.fn().mockResolvedValueOnce(null);
      const error = await ruleEngineService.getById('123').catch(e => e);

      expect(ruleEngineRepository.getById).toHaveBeenCalledWith('123');
      expect(error).toBeInstanceOf(AppError);
    });
  });

  describe('#update by id', () => {
    it('should call repo and return data', async () => {
      ruleEngineRepository.findOneAndUpdateByIdAndBrandId = jest
        .fn()
        .mockResolvedValueOnce(ruleEnginModel);

      const result = await ruleEngineService.updateByIdAndBrandId(
        '123',
        'brandId',
        ruleEnginInput
      );

      expect(
        ruleEngineRepository.findOneAndUpdateByIdAndBrandId
      ).toHaveBeenCalledWith('123', 'brandId', ruleEnginUpdateModel);
      expect(result).toEqual(ruleEnginModel);
    });

    it('should call repo without condition and return data', async () => {
      ruleEngineRepository.findOneAndUpdateByIdAndBrandId = jest
        .fn()
        .mockResolvedValueOnce(ruleEnginModel);

      const result = await ruleEngineService.updateByIdAndBrandId(
        '123',
        'brandId',
        {
          name: 'test',
          description: 'description'
        }
      );

      expect(
        ruleEngineRepository.findOneAndUpdateByIdAndBrandId
      ).toHaveBeenCalledWith('123', 'brandId', {
        name: 'test',
        description: 'description'
      });
      expect(result).toEqual(ruleEnginModel);
    });

    it('should call update fail', async () => {
      ruleEngineRepository.findOneAndUpdateByIdAndBrandId = jest
        .fn()
        .mockResolvedValueOnce(null);
      const error = await ruleEngineService
        .updateByIdAndBrandId('123', 'brandId', ruleEnginInput)
        .catch(e => e);

      expect(
        ruleEngineRepository.findOneAndUpdateByIdAndBrandId
      ).toHaveBeenCalledWith('123', 'brandId', ruleEnginUpdateModel);
      expect(error).toBeInstanceOf(AppError);
    });

    it('should update PROFILE_COMPLETION rule successfully', async () => {
      ruleEngineRepository.findOneAndUpdateByIdAndBrandId = jest
        .fn()
        .mockResolvedValueOnce(ruleEnginProfileCompletionExpected);

      const result = await ruleEngineService.updateByIdAndBrandId(
        'testId',
        'brandId',
        ProfileCompletionRuleModel
      );
      expect(result).toEqual(ruleEnginProfileCompletionExpected);
    });

    it('should update POINT_EXCHANGE rule successfully', async () => {
      ruleEngineRepository.findOneAndUpdateByIdAndBrandId = jest
        .fn()
        .mockResolvedValueOnce(PointExchangeExpectedModel);

      const result = await ruleEngineService.updateByIdAndBrandId(
        'testId',
        'brandId',
        PointExchangeRuleModel
      );
      expect(result).toEqual(PointExchangeExpectedModel);
    });

    it('should update REFERRAL rule successfully', async () => {
      ruleEngineRepository.findOneAndUpdateByIdAndBrandId = jest
        .fn()
        .mockResolvedValueOnce(ReferralExpectedModel);

      const result = await ruleEngineService.updateByIdAndBrandId(
        'testId',
        'brandId',
        ReferralRuleModel
      );
      expect(result).toEqual(ReferralExpectedModel);
    });

    it('should update DAY_OF_MONTH recurring rule successfully', async () => {
      ruleEngineRepository.findOneAndUpdateByIdAndBrandId = jest
        .fn()
        .mockResolvedValueOnce(DayOfMonthExpectedModel);

      const result = await ruleEngineService.updateByIdAndBrandId(
        'testId',
        'brandId',
        DayOfMonthRuleModel
      );
      expect(result).toEqual(DayOfMonthExpectedModel);
    });
  });
});

describe('#update by id', () => {
  it('should delete multiple rules successfully', async () => {
    ruleEngineRepository.deleteMany = jest.fn().mockResolvedValueOnce(true);
    ruleEngineRepository.getByIds = jest
      .fn()
      .mockResolvedValueOnce([DayOfMonthExpectedModel]);

    const result = await ruleEngineService.deleteList([
      DayOfMonthExpectedModel._id.toString()
    ]);
    expect(result).toEqual(true);
  });

  describe('#update by id', () => {
    it('should delete multiple rules unsuccessfully', async () => {
      ruleEngineRepository.deleteMany = jest.fn().mockResolvedValueOnce(false);

      const error = await ruleEngineService
        .deleteList([DayOfMonthExpectedModel._id.toString() + '0'])
        .catch(e => e);

      expect(error).toBeInstanceOf(AppError);
    });
  });
});
