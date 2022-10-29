import {
  activityData,
  expectedPointExchangeGetFact,
  expectedSalesTransactionGetFact,
  pointExchangeActivityData
} from '../../activities/__tests__/__mocks__/activities.data';
import { campaignExpected } from '../../campaigns/__tests__/__mocks__/campaigns.data';
import commonUtil from '../../common/util';
import RuleEngineHandler from '../ruleEngines.handler';
import { compiledRuleExpected } from './__mocks__/ruleEngines.data';

describe('RuleEngineHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
    expect.hasAssertions();
  });

  let ruleEngine: RuleEngineHandler;

  beforeAll(() => {
    ruleEngine = new RuleEngineHandler(
      compiledRuleExpected,
      'ruleName',
      campaignExpected.awards
    );
  });

  describe('#setFact', () => {
    it('setFact successfully', async () => {
      ruleEngine.setFact(activityData);
      const result = ruleEngine.fact;
      const extractedDate = commonUtil.getDateMonthYear(
        activityData.activityDate,
        'Asia/Ho_Chi_Minh'
      );
      expect(result).toEqual({
        ...expectedSalesTransactionGetFact,
        ...extractedDate
      });
    });
    it('setFact with type pointExchange successfully', async () => {
      ruleEngine.setFact(pointExchangeActivityData);
      const result = ruleEngine.fact;
      const extractedDate = commonUtil.getDateMonthYear(
        pointExchangeActivityData.activityDate,
        'Asia/Ho_Chi_Minh'
      );
      expect(result).toEqual({
        ...expectedPointExchangeGetFact,
        ...extractedDate
      });
    });
  });
  describe('#run', () => {
    it('setFact successfully', async () => {
      ruleEngine.setFact(activityData);
      const result = await ruleEngine.run();
      expect(result.events).toEqual([
        {
          params: {
            awards: campaignExpected.awards
          },
          type: 'ruleName'
        }
      ]);
    });
  });
});
