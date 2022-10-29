import { Server, ServerInjectResponse } from '@hapi/hapi';
import { Method, StatusCode } from '@swat/hapi-common';
import querystring from 'querystring';
import {
  GET_LIST_DEFAULT_LIMIT,
  GET_LIST_DEFAULT_PAGE,
  HEADER_BRAND_ID
} from '../../common/constant';
import constant from '../ruleEngines.constant';
import ruleEngineController from '../ruleEngines.controller';
import ruleEngineService from '../ruleEngines.service';
import {
  ruleEnginExpected,
  ruleEnginInput,
  ruleQuery,
  ruleEnginInputForUpdate
} from './__mocks__/ruleEngines.data';

jest.mock('../ruleEngines.service');

let server: Server;

describe('ruleEngines.controller', () => {
  const invalidResponse = {
    error: 'Bad Request',
    message: 'Invalid request payload input',
    statusCode: StatusCode.BAD_REQUEST
  };

  beforeAll(async () => {
    server = new Server();
    server.route(ruleEngineController);
  });

  afterEach(() => {
    expect.hasAssertions();
    jest.resetAllMocks();
  });

  describe('#Get rule by id', () => {
    it('should call get service and response data', async () => {
      ruleEngineService.getById = jest
        .fn()
        .mockResolvedValueOnce({ toObject: () => ruleEnginExpected });
      const id = '60f844d027af5dc14d85a660';
      const response: ServerInjectResponse = await server.inject({
        method: Method.GET,
        url: `/${constant.RULES_PATH}/${id}`
      });

      expect(response.statusCode).toEqual(StatusCode.OK);
      expect(response.result).toEqual(ruleEnginExpected);
    });
  });

  describe('#Get rule list', () => {
    it('should call get service and response data', async () => {
      const query = querystring.stringify(ruleQuery);
      ruleEngineService.getList = jest.fn().mockResolvedValueOnce({
        items: [ruleEnginExpected],
        pagination: {
          totalItems: 1,
          page: GET_LIST_DEFAULT_PAGE,
          totalPages: 1,
          limit: GET_LIST_DEFAULT_LIMIT
        }
      });
      const response: ServerInjectResponse = await server.inject({
        method: Method.GET,
        url: `/${constant.RULES_PATH}?${query}`
      });

      expect(ruleEngineService.getList).toHaveBeenCalledWith(ruleQuery);
      expect(response.statusCode).toEqual(StatusCode.OK);
      expect(response.result).toEqual({
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

  describe('#Create rule', () => {
    it('should throw BAD_REQUEST if payload is empty', async () => {
      const response: ServerInjectResponse = await server.inject({
        method: Method.POST,
        url: `/${constant.RULES_PATH}`,
        payload: JSON.stringify({})
      });
      expect(ruleEngineService.create).toHaveBeenCalledTimes(0);
      expect(response.statusCode).toEqual(StatusCode.BAD_REQUEST);
      expect(response.result).toEqual(invalidResponse);
    });

    it('should call ruleEngineService and response successfully', async () => {
      ruleEngineService.create = jest
        .fn()
        .mockResolvedValueOnce({ toObject: () => ruleEnginExpected });

      const response: ServerInjectResponse = await server.inject({
        method: Method.POST,
        headers: {
          [HEADER_BRAND_ID]: 'brandId'
        },
        url: `/${constant.RULES_PATH}`,
        payload: JSON.stringify(ruleEnginInput)
      });

      expect(response.result).toEqual(ruleEnginExpected);
    });
  });

  describe('#Update rule by id', () => {
    it('should call ruleEngineService and response successfully', async () => {
      ruleEngineService.updateByIdAndBrandId = jest
        .fn()
        .mockResolvedValueOnce({ toObject: () => ruleEnginExpected });
      const id = '60f844d027af5dc14d85a660';
      const response: ServerInjectResponse = await server.inject({
        method: Method.PATCH,
        headers: {
          [HEADER_BRAND_ID]: 'brandId'
        },
        url: `/${constant.RULES_PATH}/${id}`,
        payload: ruleEnginInputForUpdate
      });

      expect(response.result).toEqual(ruleEnginExpected);
    });
  });

  describe('#Delete rule by list ids', () => {
    it('should call ruleEngineService and response successfully', async () => {
      ruleEngineService.deleteList = jest
        .fn()
        .mockResolvedValueOnce({ toObject: () => true });
      const ids = '60f844d027af5dc14d85a660';
      const response: ServerInjectResponse = await server.inject({
        method: Method.POST,
        headers: {
          [HEADER_BRAND_ID]: 'brandId'
        },
        url: `/${constant.RULES_PATH}/delete`,
        payload: {
          ruleIds: [ids]
        }
      });

      expect(response.statusCode).toEqual(StatusCode.NO_CONTENT);
    });
  });
});
