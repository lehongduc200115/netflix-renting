import { LeanDocument } from 'mongoose';
import { RecurringCriteria, ReferralCriteria } from './ruleEngines.enum';
import {
  IRuleEngine,
  IRuleEngineFilter,
  ICondition
} from './ruleEngines.interface';
import { RuleEngineDocument } from './ruleEngines.model';
import ruleEngineRepository from './ruleEngines.repository';
import {
  pointExchangeConverter,
  profileCompletionConverter,
  recurringConverter,
  referralConverter,
  salesTransactionConverter
} from './ruleEngines.util';


const getList = async (
  filter: Record<string, unknown>
): Promise<any> => {
  const paginationParams: any = filter;

  const queryParams: IRuleEngineFilter = {};
  if (filter.status) {
    queryParams.status = filter.status as any;
  }
  if (filter.searchText) {
    queryParams.searchText = filter.searchText as string;
  }
  if (filter.campaignType) {
    queryParams.campaignType = filter.campaignType as any
  }
  if (filter.applyTo) {
    queryParams.applyTo = filter.applyTo as string;
  }
  if (typeof filter.isTemplate !== 'undefined') {
    queryParams.isTemplate = filter.isTemplate as boolean;
  }
  const [items, totalItems]: [
    RuleEngineDocument[],
    number
  ] = await Promise.all([
    ruleEngineRepository.getList(queryParams, paginationParams),
    ruleEngineRepository.countByParameter(queryParams)
  ]);
  const pagination: any = {
    totalItems
  };
  const result: any = {
    items: items.map(item => item.toObject()),
    pagination
  };
  return result;
};

const getListByRuleIds = async (
  ruleIds: string[]
): Promise<RuleEngineDocument[]> => {
  return ruleEngineRepository.getListWithoutPaginate({
    _id: { $in: ruleIds }
  });
};

const getById = async (id: string): Promise<RuleEngineDocument> => {
  const data = await ruleEngineRepository.getById(id);
  if (!data) {
    // throw new AppError(ERROR_CODE.RULE_NOT_FOUND, [
    //   {
    //     message: 'Rule Not Found',
    //     key: 'Rule Id',
    //     code: ERROR_CODE.RULE_NOT_FOUND
    //   }
    // ]);
    throw new Error();
  }
  return data;
};

const ruleEngineService = {
  getList,
  getById,
  getListByRuleIds,
};

export default ruleEngineService;
