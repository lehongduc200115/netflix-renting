import { TopLevelCondition } from 'json-rules-engine';
import {
  NormalEventType,
  RecurringEventType,
  ScheduledEventType
} from '../../../campaigns/campaigns.enum';
import {
  GET_LIST_DEFAULT_LIMIT,
  GET_LIST_DEFAULT_PAGE
} from '../../../common/constant';
import {
  RuleCondition,
  SortFieldEnum,
  SortTypeEnum,
  Status
} from '../../../common/enum';
import { ERROR_CODE } from '../../../common/errors';
import {
  ActivityType,
  Criteria,
  MonthOfYear,
  Operator,
  PointExchangeCriteria,
  ProfileCompletionCriteria,
  ProfileCompletionOperator,
  RecurringCriteria,
  RecurringType,
  ReferralCriteria
} from '../../ruleEngines.enum';
import { IRuleEngine } from '../../ruleEngines.interface';
const ObjectID = require('mongodb').ObjectID;

export const ruleEnginInput: IRuleEngine = {
  name: 'test',
  campaignType: NormalEventType.SALES_TRANSACTION,
  description: 'description',
  conditions: [
    {
      criteria: Criteria.TOTAL_QUANTITY,
      operator: Operator.EQUAL,
      value: 2
    },
    {
      operator: RuleCondition.AND
    },
    {
      criteria: Criteria.TOTAL_AMOUNT,
      operator: Operator.GREATER_THAN,
      value: 1000
    }
  ],
  status: Status.ACTIVE,
  isTemplate: true
};

export const ruleEnginInputForUpdate: any = {
  name: 'test',
  campaignType: NormalEventType.SALES_TRANSACTION,
  description: 'description',
  conditions: [
    {
      criteria: Criteria.TOTAL_QUANTITY,
      operator: Operator.EQUAL,
      value: 2
    },
    {
      operator: RuleCondition.AND
    },
    {
      criteria: Criteria.TOTAL_AMOUNT,
      operator: Operator.GREATER_THAN,
      value: 1000
    }
  ],
  status: Status.ACTIVE
};

export const ruleEnginModel: IRuleEngine = {
  name: 'test',
  applyTo: 'brandId',
  campaignType: NormalEventType.SALES_TRANSACTION,
  description: 'description',
  conditions: [
    {
      criteria: Criteria.ACTIVITY_TYPE,
      operator: Operator.EQUAL,
      value: ActivityType.SALES_TRANSACTION
    },
    {
      operator: RuleCondition.AND
    },
    {
      criteria: Criteria.TOTAL_AMOUNT,
      operator: Operator.GREATER_THAN,
      value: 1000
    }
  ],
  compiledRule: {
    all: [
      {
        operator: 'equal',
        value: 'SALES_TRANSACTION',
        fact: 'activityType'
      },
      {
        operator: 'greaterThan',
        value: 1000,
        fact: 'totalAmount'
      }
    ]
  },
  status: Status.ACTIVE,
  isTemplate: true
};

export const ruleEnginUpdateModel: IRuleEngine = {
  name: 'test',
  campaignType: NormalEventType.SALES_TRANSACTION,
  description: 'description',
  conditions: [
    {
      criteria: Criteria.TOTAL_QUANTITY,
      operator: Operator.EQUAL,
      value: 2
    },
    {
      operator: RuleCondition.AND
    },
    {
      criteria: Criteria.TOTAL_AMOUNT,
      operator: Operator.GREATER_THAN,
      value: 1000
    }
  ],
  compiledRule: {
    all: [
      {
        all: [
          {
            operator: 'equal',
            value: 2,
            fact: 'totalQuantity'
          },
          {
            operator: 'greaterThan',
            value: 1000,
            fact: 'totalAmount'
          }
        ]
      },
      {
        operator: 'equal',
        value: 'SALES_TRANSACTION',
        fact: 'activityType'
      }
    ]
  },
  status: Status.ACTIVE,
  isTemplate: true
};

export const ruleEnginExpected: IRuleEngine = {
  _id: ObjectID(),
  id: ObjectID(),
  name: 'test',
  applyTo: 'brandId',
  campaignType: ScheduledEventType.BIRTHDAY,
  description: 'description',
  conditions: [
    {
      criteria: Criteria.ACTIVITY_TYPE,
      operator: Operator.EQUAL,
      value: ActivityType.SALES_TRANSACTION
    },
    {
      operator: RuleCondition.AND
    },
    {
      criteria: Criteria.TOTAL_AMOUNT,
      operator: Operator.GREATER_THAN,
      value: 1000
    }
  ],
  compiledRule: {
    all: [
      {
        operator: 'equal',
        value: 'SALES_TRANSACTION',
        fact: 'activityType'
      },
      {
        operator: 'greaterThan',
        value: 1000,
        fact: 'totalAmount'
      }
    ]
  },
  status: Status.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTemplate: true
};
export const ruleEnginBirthmonthExpected: IRuleEngine = {
  _id: ObjectID(),
  id: ObjectID(),
  name: 'test',
  applyTo: 'brandId',
  campaignType: ScheduledEventType.BIRTHMONTH,
  description: 'description',
  conditions: [
    {
      criteria: Criteria.ACTIVITY_TYPE,
      operator: Operator.EQUAL,
      value: ActivityType.SALES_TRANSACTION
    },
    {
      operator: RuleCondition.AND
    },
    {
      criteria: Criteria.TOTAL_AMOUNT,
      operator: Operator.GREATER_THAN,
      value: 1000
    }
  ],
  compiledRule: {
    all: [
      {
        operator: 'greaterThan',
        value: 1000,
        fact: 'totalAmount'
      },
      {
        all: [
          {
            operator: 'equal',
            value: 'SALES_TRANSACTION',
            fact: 'activityType'
          }
        ]
      }
    ]
  },
  status: Status.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTemplate: true
};

export const ProfileCompletionRuleModel: IRuleEngine = {
  _id: ObjectID(),
  id: ObjectID(),
  name: 'test ProfileCompletion Rule',
  applyTo: 'brandId',
  campaignType: NormalEventType.PROFILE_COMPLETION,
  description: 'description',
  conditions: [
    {
      criteria: ProfileCompletionCriteria.FIRST_NAME,
      operator: ProfileCompletionOperator.EXISTS,
      value: 'true'
    }
  ],
  status: Status.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTemplate: true
};

export const ruleEnginProfileCompletionExpected: IRuleEngine = {
  _id: ObjectID(),
  id: ObjectID(),
  name: 'test ProfileCompletion Rule',
  applyTo: 'brandId',
  campaignType: NormalEventType.PROFILE_COMPLETION,
  description: 'description',
  conditions: [
    {
      criteria: ProfileCompletionCriteria.FIRST_NAME,
      operator: ProfileCompletionOperator.EXISTS,
      value: 'true'
    }
  ],
  compiledRule: {
    all: [
      {
        operator: 'notEqual',
        value: '',
        fact: 'firstName'
      },
      {
        operator: 'equal',
        value: 'PROFILE_COMPLETION',
        fact: 'activityType'
      }
    ]
  },
  status: Status.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTemplate: true
};

export const ReferralRuleModel: IRuleEngine = {
  _id: ObjectID(),
  id: ObjectID(),
  name: 'test referral Rule',
  campaignType: NormalEventType.REFERRAL,
  description: 'description',
  conditions: [
    {
      criteria: ReferralCriteria.REFERRAL_COUNT,
      operator: Operator.EQUAL,
      value: '1,3'
    }
  ],
  status: Status.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTemplate: true
};

export const ReferralExpectedModel: IRuleEngine = {
  _id: ObjectID(),
  id: ObjectID(),
  name: 'test referral Rule',
  campaignType: NormalEventType.REFERRAL,
  description: 'description',
  conditions: [
    {
      criteria: ReferralCriteria.REFERRAL_COUNT,
      operator: Operator.EQUAL,
      value: '1,3'
    }
  ],
  compiledRule: {
    all: [
      {
        operator: 'equal',
        value: 'REFERRAL',
        fact: 'activityType'
      },
      {
        any: [
          {
            operator: 'equal',
            value: '1',
            fact: 'referralCount'
          },
          {
            any: [
              {
                operator: 'equal',
                value: '3',
                fact: 'referralCount'
              }
            ]
          }
        ]
      }
    ]
  },
  status: Status.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTemplate: true
};

export const DayOfMonthRuleModel: IRuleEngine = {
  _id: ObjectID(),
  id: ObjectID(),
  name: 'test DAY_OF_MONTH recurring Rule',
  campaignType: RecurringEventType.RECURRING_EVENT,
  description: 'description',
  conditions: [
    {
      criteria: RecurringCriteria.RECURRING_TYPE,
      operator: Operator.EQUAL,
      value: RecurringType.DAY_OF_MONTH
    },
    { operator: RuleCondition.AND },
    {
      criteria: RecurringCriteria.SELECT_MONTH,
      operator: Operator.EQUAL,
      value: MonthOfYear.JANUARY
    },
    { operator: RuleCondition.AND },
    {
      criteria: RecurringCriteria.SELECT_DATE,
      operator: Operator.EQUAL,
      value: '1'
    },
    { operator: RuleCondition.AND },
    {
      criteria: RecurringCriteria.LIMIT_PER_DAY,
      operator: Operator.EQUAL,
      value: 0
    }
  ],
  status: Status.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTemplate: true
};

export const DayOfMonthExpectedModel: IRuleEngine = {
  _id: ObjectID(),
  id: ObjectID(),
  name: 'test DAY_OF_MONTH recurring Rule',
  campaignType: RecurringEventType.RECURRING_EVENT,
  description: 'description',
  conditions: [
    {
      criteria: RecurringCriteria.RECURRING_TYPE,
      operator: Operator.EQUAL,
      value: RecurringType.DAY_OF_MONTH
    },
    { operator: RuleCondition.AND },
    {
      criteria: RecurringCriteria.SELECT_MONTH,
      operator: Operator.EQUAL,
      value: MonthOfYear.JANUARY
    },
    { operator: RuleCondition.AND },
    {
      criteria: RecurringCriteria.SELECT_DATE,
      operator: Operator.EQUAL,
      value: '1'
    },
    { operator: RuleCondition.AND },
    {
      criteria: RecurringCriteria.LIMIT_PER_DAY,
      operator: Operator.EQUAL,
      value: 0
    }
  ],
  compiledRule: {
    all: [
      {
        operator: 'equal',
        value: 'Jan',
        fact: 'selectMonth'
      },
      {
        operator: 'equal',
        value: '1',
        fact: 'selectDate'
      },
      {
        operator: 'lessThanInclusive',
        value: Number.MAX_SAFE_INTEGER,
        fact: 'limitPerDay'
      }
    ]
  },
  status: Status.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTemplate: false
};

export const compiledRuleExpected: TopLevelCondition = {
  all: [
    {
      operator: 'greaterThan',
      value: 1000,
      fact: 'totalAmount'
    },
    {
      all: [
        {
          operator: 'equal',
          value: 'SALES_TRANSACTION',
          fact: 'activityType'
        }
      ]
    }
  ]
};

export const ruleQuery = {
  status: Status.ACTIVE,
  limit: GET_LIST_DEFAULT_LIMIT,
  page: GET_LIST_DEFAULT_PAGE,
  sortField: SortFieldEnum.UPDATED_AT,
  sortType: SortTypeEnum.ASCENDING
};

export const errorResponseSample = {
  error: {
    message: 'Rule not found',
    code: 1307003,
    errors: [
      {
        message: 'Rule not found in database',
        key: 'Rule Id',
        code: ERROR_CODE.RULE_NOT_FOUND
      }
    ]
  }
};

export const ruleDetailResponse = {
  _id: '61ca86375bfe22258a831a1b',
  id: '61ca86375bfe22258a831a1b',
  name: 'Complete Order',
  applyTo: 'brandId',
  campaignType: 'TRANSACTION',
  description: 'description',
  conditions: {
    AND: [
      {
        criteria: 'ACTIVITY_TYPE',
        operator: 'EQUAL',
        value: 'SALES_TRANSACTION'
      },
      {
        criteria: 'TOTAL_AMOUNT',
        operator: 'GREATER_THAN',
        value: 1000
      }
    ]
  },
  status: 'ACTIVE',
  createdBy: 'admin@positivethinking.tech',
  updatedBy: 'admin@positivethinking.tech',
  compiledRule: {
    all: [
      {
        fact: 'ACTIVITY_TYPE',
        operator: 'EQUAL',
        value: 'SALES_TRANSACTION'
      },
      {
        fact: 'TOTAL_AMOUNT',
        operator: 'GREATER_THAN',
        value: 1000
      }
    ]
  },
  createdAt: '2021-12-28T03:36:23.909Z',
  updatedAt: '2021-12-28T03:36:23.909Z',
  isTemplate: true
};

export const paginationExample = {
  totalItems: 1,
  page: 1,
  totalPages: 1,
  limit: 25
};

export const ruleUpdatePayloadExample = {
  name: 'Complete Order',
  applyTo: 'brandId',
  description: 'description',
  campaignType: 'TRANSACTION',
  conditions: [
    {
      criteria: Criteria.ACTIVITY_TYPE,
      operator: Operator.EQUAL,
      value: ActivityType.SALES_TRANSACTION
    },
    {
      operator: RuleCondition.AND
    },
    {
      criteria: Criteria.TOTAL_AMOUNT,
      operator: Operator.GREATER_THAN,
      value: 1000
    }
  ],
  status: 'ACTIVE'
};

export const PointExchangeRuleModel = {
  name: 'point exchange test rule',
  description: 'description',
  campaignType: NormalEventType.POINT_EXCHANGE,
  status: Status.ACTIVE,
  conditions: [
    {
      criteria: PointExchangeCriteria.EXCHANGED_POINT,
      operator: Operator.EQUAL,
      value: 100
    }
  ]
};

export const PointExchangeExpectedModel = {
  name: 'point exchange test rule',
  description: 'description',
  campaignType: NormalEventType.POINT_EXCHANGE,
  status: Status.ACTIVE,
  conditions: [
    {
      criteria: PointExchangeCriteria.EXCHANGED_POINT,
      operator: Operator.EQUAL,
      value: 100
    }
  ],
  compiledRule: {
    all: [
      {
        operator: 'equal',
        value: 'POINT_EXCHANGE',
        fact: 'activityType'
      },
      {
        all: [
          {
            operator: 'equal',
            value: 100,
            fact: 'exchangePoint'
          }
        ]
      }
    ]
  }
};

export const extractRequestExample = {
  ruleIds: ['61ca86375bfe22258a831a1b']
};
