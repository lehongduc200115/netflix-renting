import { IMongoBase } from '@swat/hapi-common';
import { Request } from 'hapi';
import { TopLevelCondition } from 'json-rules-engine';
import {
  NormalEventType,
  RecurringEventType,
  ScheduledEventType
} from '../campaigns/campaigns.enum';
import { RuleCondition, Status } from '../common/enum';
import { IOperator } from '../common/interface';
import {
  ActivityType,
  Criteria,
  Operator,
  PointExchangeCriteria,
  ProfileCompletionCriteria,
  ProfileCompletionOperator,
  RecurringCriteria,
  ReferralCriteria,
  RegistrationCriteria,
  SalesTransactionCriteria
} from './ruleEngines.enum';

export interface IRuleEvent {
  type: string;
  params: {
    message: string;
  };
}
export interface ICondition {
  criteria:
    | Criteria
    | SalesTransactionCriteria
    | RegistrationCriteria
    | ProfileCompletionCriteria
    | PointExchangeCriteria
    | ReferralCriteria
    | RecurringCriteria;
  operator: Operator | ProfileCompletionOperator;
  value: ActivityType | string | number;
}

export interface ICompiledCondition {
  fact: Criteria;
  operator: Operator;
  value: ActivityType | string | number;
}

export interface IConditionWrap
  extends Partial<Record<RuleCondition, (ICondition | IConditionWrap)[]>> {}

export interface IRuleEngine extends Partial<IMongoBase> {
  id?: string;
  name: string;
  applyTo?: string;
  campaignType: ScheduledEventType | NormalEventType | RecurringEventType;
  description?: string;
  conditions?: (ICondition | IOperator)[];
  compiledRule?: TopLevelCondition | object;
  status: Status;
  isTemplate: boolean;
  createdBy?: string;
  updatedBy?: string;
}
export interface IRuleEngineRequest extends Request {
  payload: IRuleEngine;
}

export interface IExtractListRequest extends Request {
  payload: {
    ruleIds: string[];
  };
}

export interface IRuleEngineFilter {
  status?: Status;
  name?: object;
  searchText?: string;
  applyTo?: string;
  isTemplate?: boolean;
  campaignType?: ScheduledEventType | NormalEventType | RecurringEventType;
}
