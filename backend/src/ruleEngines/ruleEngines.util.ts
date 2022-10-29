import axios from 'axios';
import { IActivity, IActivityData } from '../activities/activities.interface';
import { NormalEventType } from '../campaigns/campaigns.enum';
import { RuleCondition } from '../common/enum';
import { AppError } from '../common/error/AppError';
import { ERROR_CODE } from '../common/errors';
import { IOperator } from '../common/interface';
import commonUtil from '../common/util';
import config from '../config';
import logger from '../logger';
import {
  ActivityType,
  Criteria,
  Operator,
  PointExchangeCriteria,
  ProfileCompletionCriteria,
  RecurringCriteria,
  ReferralCriteria
} from './ruleEngines.enum';
import { ICondition } from './ruleEngines.interface';

export const salesTransactionConverter = (
  conditions: (ICondition | IOperator)[]
): (ICondition | IOperator | (ICondition | IOperator)[])[] => {
  var convertedConditions: (
    | ICondition
    | IOperator
    | (ICondition | IOperator)[]
  )[] = [];
  var oldConditions: (ICondition | IOperator)[] = [];
  for (let condition of conditions) {
    oldConditions.push({ ...condition });
  }
  convertedConditions.push(oldConditions);
  // add Activity type to conditons
  convertedConditions = convertedConditions.concat([
    { operator: RuleCondition.AND },
    {
      criteria: Criteria.ACTIVITY_TYPE,
      operator: Operator.EQUAL,
      value: ActivityType.SALES_TRANSACTION
    }
  ]);

  return convertedConditions;
};

export const profileCompletionConverter = (
  conditions: (ICondition | IOperator)[]
): (ICondition | IOperator)[] => {
  var convertedConditions: (ICondition | IOperator)[] = [];

  if (
    conditions.some(
      condition =>
        (condition as ICondition).criteria === ProfileCompletionCriteria.ALL
    )
  ) {
    // extract all criteria
    for (var criteria of Object.values(ProfileCompletionCriteria)) {
      if (criteria !== ProfileCompletionCriteria.ALL) {
        if (convertedConditions.length > 0)
          convertedConditions.push({ operator: RuleCondition.AND });
        convertedConditions.push({
          criteria,
          operator: Operator.NOT_EQUAL,
          value: ''
        });
      }
    }
  } else {
    convertedConditions = conditions.map(condition => {
      if ((condition as ICondition).criteria)
        return {
          criteria: (condition as ICondition).criteria,
          operator: Operator.NOT_EQUAL,
          value: ''
        };
      else return condition;
    });
  }

  // add Activity type to conditons
  convertedConditions = convertedConditions.concat([
    { operator: RuleCondition.AND },
    {
      criteria: Criteria.ACTIVITY_TYPE,
      operator: Operator.EQUAL,
      value: ActivityType.PROFILE_COMPLETION
    }
  ]);

  return convertedConditions;
};

export const pointExchangeConverter = (
  conditions: (ICondition | IOperator)[]
): (ICondition | IOperator)[] => {
  var convertedConditions: (ICondition | IOperator)[] = [];
  for (let condition of conditions) {
    convertedConditions.push({ ...condition });
  }

  // change limitation operator to less than inclusive
  for (var condition of convertedConditions) {
    condition = condition as ICondition;
    if (condition.criteria === PointExchangeCriteria.LIMITATION) {
      condition.operator = Operator.LESS_THAN;
      if (condition.value == -1) condition.value = Number.MAX_SAFE_INTEGER;
    }
  }

  // add Activity type to conditons
  convertedConditions = convertedConditions.concat([
    { operator: RuleCondition.AND },
    {
      criteria: Criteria.ACTIVITY_TYPE,
      operator: Operator.EQUAL,
      value: ActivityType.POINT_EXCHANGE
    }
  ]);
  return convertedConditions;
};

export const referralConverter = (
  conditions: (ICondition | IOperator)[]
): (ICondition | IOperator | (ICondition | IOperator)[])[] => {
  var convertedConditions: (
    | ICondition
    | IOperator
    | (ICondition | IOperator)[]
  )[] = [];
  var referralCountCondition: (ICondition | IOperator)[] = [];

  // convert the refferal count string to multiple "OR" condition
  const referralCountValues: number[] = ((conditions[0] as ICondition)
    .value as string)
    .split(',')
    .map(value => {
      let standarlizeValue = value.replace(/ /g, '');
      return Number.parseInt(standarlizeValue);
    });

  for (var value of referralCountValues) {
    if (referralCountCondition.length > 0)
      referralCountCondition.push({
        operator: RuleCondition.OR
      });
    referralCountCondition.push({
      criteria: ReferralCriteria.REFERRAL_COUNT,
      operator: Operator.EQUAL,
      value
    });
  }
  convertedConditions.push(referralCountCondition);

  // add Activity type to conditons
  convertedConditions = convertedConditions.concat([
    { operator: RuleCondition.AND },
    {
      criteria: Criteria.ACTIVITY_TYPE,
      operator: Operator.EQUAL,
      value: ActivityType.REFERRAL
    }
  ]);
  return convertedConditions;
};

export const recurringConverter = (
  conditions: (ICondition | IOperator)[]
): (ICondition | IOperator | (ICondition | IOperator)[])[] => {
  var convertedConditions: (
    | ICondition
    | IOperator
    | (ICondition | IOperator)[]
  )[] = conditions.map(condition => {
    return { ...condition };
  });

  convertedConditions = convertedConditions.map(condition => {
    condition = condition as ICondition;
    switch (condition.criteria) {
      // extract month of year
      case RecurringCriteria.SELECT_MONTH:
        var months: string[] = (condition.value as string)
          .split(',')
          .map(value => {
            let standarlizeValue = value.replace(/ /g, '');
            return standarlizeValue;
          });
        var monthConditions: (ICondition | IOperator)[] = [];
        for (let month of months) {
          if (monthConditions.length !== 0)
            monthConditions.push({ operator: RuleCondition.OR });
          monthConditions.push({
            criteria: RecurringCriteria.SELECT_MONTH,
            operator: Operator.EQUAL,
            value: month
          });
        }

        return monthConditions;
        break;
      // extract day of week
      case RecurringCriteria.SELECT_DAY:
        var days: string[] = (condition.value as string)
          .split(',')
          .map(value => {
            let standarlizeValue = value.replace(/ /g, '');
            return standarlizeValue;
          });
        var dayConditions: (ICondition | IOperator)[] = [];
        for (let day of days) {
          if (dayConditions.length !== 0)
            dayConditions.push({ operator: RuleCondition.OR });
          dayConditions.push({
            criteria: RecurringCriteria.SELECT_DAY,
            operator: Operator.EQUAL,
            value: day
          });
        }
        return dayConditions;
        break;
      // extract date of month
      case RecurringCriteria.SELECT_DATE:
        var dates: number[] = (condition.value as string)
          .split(',')
          .map(value => {
            let standarlizeValue = value.replace(/ /g, '');
            return Number.parseInt(standarlizeValue);
          });
        var dateConditions: (ICondition | IOperator)[] = [];
        for (let date of dates) {
          if (dateConditions.length !== 0)
            dateConditions.push({ operator: RuleCondition.OR });
          dateConditions.push({
            criteria: RecurringCriteria.SELECT_DATE,
            operator: Operator.EQUAL,
            value: date
          });
        }
        return dateConditions;
        break;
      // change limit per day from 0 to INT_MAX
      case RecurringCriteria.LIMIT_PER_DAY:
        if (condition.value == 0) {
          condition.value = Number.MAX_SAFE_INTEGER;
        }
        condition.operator = Operator.LESS_THAN;
        return condition;
        break;
      default:
        return condition;
    }
  });

  return convertedConditions;
};

export const getFactsFromExternal = async (
  data: IActivity,
  campaignId: string
): Promise<IActivityData> => {
  let limitPerDay = undefined;
  let limitation = undefined;
  if (
    data.activityType === (NormalEventType.SALES_TRANSACTION as string) &&
    !data.activityData.limitPerDay
  ) {
    const date = commonUtil.getDateFormatedForValidation(
      data.activityDate,
      'Asia/Ho_Chi_Minh'
    );
    const limitPerDayUrl =
      config.membershipEndpoint +
      `/transactions/${data.activityData.memberId}/validateTransaction?date=${date}&transactionType=REWARD`;
    let limitPerDayResponse = undefined;
    logger.info(`TransactionValidation request sent: ${limitPerDayUrl}`);
    try {
      limitPerDayResponse = await axios({
        method: 'get',
        url: limitPerDayUrl,
        timeout: 2000
      });
      limitPerDay = limitPerDayResponse.data.totalTransactionInDay as number;
    } catch (e) {
      throw new AppError(ERROR_CODE.INVALID_REQUEST, [
        {
          message: 'Error while retrieving membership transaction info',
          code: ERROR_CODE.INVALID_REQUEST,
          key: 'rewards.value'
        }
      ]);
    }
  } else if (
    data.activityType === (NormalEventType.POINT_EXCHANGE as string) &&
    !data.activityData.limitation
  ) {
    const limitationUrl =
      config.membershipEndpoint +
      `/transactions/${data.activityData.memberId}/validateTransaction?transactionType=REWARD&campaignId=${campaignId}`;
    let limitationUrlResponse = undefined;
    logger.info(`TransactionValidation request sent: ${limitationUrl}`);
    try {
      limitationUrlResponse = await axios({
        method: 'get',
        url: limitationUrl,
        timeout: 2000
      });
      limitation = limitationUrlResponse.data.totalTransaction as number;
    } catch (e) {
      throw new AppError(ERROR_CODE.INVALID_REQUEST, [
        {
          message: 'Error while retrieving membership pointExchange info',
          code: ERROR_CODE.INVALID_REQUEST,
          key: 'rewards.value'
        }
      ]);
    }
  }
  return {
    limitPerDay,
    limitation
  };
};
