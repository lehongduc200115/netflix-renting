export enum Criteria {
  ACTIVITY_TYPE = 'activityType',
  TOTAL_AMOUNT = 'totalAmount',
  TRANSACTION_STATUS = 'transactionStatus',
  DATE = 'date',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PHONE_NUMBER = 'phoneNumber',
  BIRTHDAY = 'birthday',
  GENDER = 'gender',
  PERSONAL_ID_TYPE = 'personalIDType',
  PERSONAL_ID_NUMBER = 'personalIDNumber',
  NATIONALITY = 'nationality',
  MARITAL_STATUS = 'maritalStatus',
  INTERESTS = 'interests',
  PREFERRED_LANGUAGE = 'preferredLanguage',
  BIRTHMONTH = 'birthmonth',
  APPLIED_TIER = 'appliedTier',
  TOTAL_QUANTITY = 'totalQuantity',
  EXCHANGED_POINT = 'exchangedPoint',
  REFERRAL_COUNT = 'referralCount',
  LIMIT_PER_DAY = 'limitPerDay',
  LIMITATION = 'limitation'
}

export enum ActivityType {
  SALES_TRANSACTION = 'SALES_TRANSACTION',
  REGISTRATION = 'REGISTRATION',
  PROFILE_COMPLETION = 'PROFILE_COMPLETION',
  BIRTHDAY = 'BIRTHDAY',
  BIRTHMONTH = 'BIRTHMONTH',
  REFERRAL = 'REFERRAL',
  POINT_EXCHANGE = 'POINT_EXCHANGE',
  SURVEY_COMPLETION = 'SURVEY_COMPLETION',
  RECURRING = 'RECURRING'
}

export enum TransactionStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED'
}

export enum Operator {
  'EQUAL' = 'equal',
  'NOT_EQUAL' = 'notEqual',
  'GREATER_THAN_INCLUSIVE' = 'greaterThanInclusive',
  'LESS_THAN_INCLUSIVE' = 'lessThanInclusive',
  'GREATER_THAN' = 'greaterThan',
  'LESS_THAN' = 'lessThan'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum MartialStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED'
}

export enum Language {
  VN = 'VN',
  EN = 'EN'
}

export enum MonthOfYear {
  JANUARY = 'Jan',
  FEBRUARY = 'Feb',
  MARCH = 'Mar',
  APRIL = 'Apr',
  MAY = 'May',
  JUNE = 'Jun',
  JULY = 'Jul',
  AUGUST = 'Aug',
  SEPTEMBER = 'Sep',
  OCTOBER = 'Oct',
  NOVEMBER = 'Nov',
  DECEMBER = 'Dec'
}

export enum DayOfWeek {
  MONDAY = 'Mon',
  TUESDAY = 'Tue',
  WEDNESDAY = 'Wed',
  THURSDAY = 'Thu',
  FRIDAY = 'Fri',
  SATURDAY = 'Sat',
  SUNDAY = 'Sun'
}

export enum Tier {
  ALL = 'ALL'
}

export enum SalesTransactionCriteria {
  TOTAL_AMOUNT = 'totalAmount',
  TRANSACTION_STATUS = 'transactionStatus',
  DATE = 'date',
  TOTAL_QUANTITY = 'totalQuantity'
}

export enum RegistrationCriteria {
  ACTIVITY_TYPE = 'activityType'
}

export enum ProfileCompletionCriteria {
  ALL = 'allInformation',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PHONE_NUMBER = 'phoneNumber',
  BIRTHDAY = 'birthday',
  GENDER = 'gender',
  PERSONAL_ID_TYPE = 'personalIDType',
  PERSONAL_ID_NUMBER = 'personalIDNumber',
  NATIONALITY = 'nationality',
  MARITAL_STATUS = 'maritalStatus',
  INTERESTS = 'interests',
  PREFERRED_LANGUAGE = 'preferredLanguage'
}

export enum ProfileCompletionOperator {
  'EXISTS' = 'exists'
}

export enum PointExchangeCriteria {
  EXCHANGED_POINT = 'exchangedPoint',
  LIMITATION = 'limitation'
}

export enum ReferralCriteria {
  REFERRAL_COUNT = 'referralCount'
}

export enum RecurringCriteria {
  RECURRING_TYPE = 'recurringType',
  SELECT_MONTH = 'selectMonth',
  SELECT_DATE = 'selectDate',
  SELECT_DAY = 'selectDay',
  LIMIT_PER_DAY = 'limitPerDay'
}

export enum RecurringType {
  MONTH_OF_YEAR = 'MONTH_OF_YEAR',
  DAY_OF_MONTH = 'DAY_OF_MONTH',
  DAY_OF_WEEK = 'DAY_OF_WEEK'
}

export enum Reward {
  POINT = 'POINT',
  PRODUCT = 'PRODUCT',
  AMOUNT_DISCOUNT = 'AMOUNT_DISCOUNT',
  PERCENTAGE_DISCOUNT = 'PERCENTAGE_DISCOUNT'
}
