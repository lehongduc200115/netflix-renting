import { Criteria, RecurringCriteria } from './ruleEngines.enum';

export default {
  MODEL_NAME: 'ruleEngines',
  RULES_PATH: 'rules',
  BIRTHDAY_REGEX: /^(?:0[1-9]|[12][0-9]|3[01])[/](?:0[1-9]|1[012])$/,
  SPECIAL_CHARACTERS_REGEX: /[-.*+?^${}()|[\]\\<>&%`~#@!=/,'_"]/g,
  REQUIRED_CRITERIA: {
    BIRTHMONTH_REQURIED_CRITERIA: [Criteria.APPLIED_TIER, Criteria.BIRTHMONTH],
    BIRTHDAY_REQURIED_CRITERIA: [Criteria.APPLIED_TIER, Criteria.BIRTHDAY],
    RECURRING_REQUIRED_CRITERIA: [
      RecurringCriteria.LIMIT_PER_DAY,
      RecurringCriteria.RECURRING_TYPE
    ]
  },
  MULTIPLE_IDS_REGEX: /[0-9a-fA-F]{24,24}(,|[0-9a-fA-F]{24,24})*/
};
