import { Engine, EngineResult, TopLevelCondition } from 'json-rules-engine';
import { IActivity } from '../activities/activities.interface';
import { IAward } from '../campaigns/campaigns.interface';
import commonUtil from '../common/util';
import logger from '../logger';
import { Criteria } from './ruleEngines.enum';

export default class RuleEngineHandler {
  private readonly engine: Engine;
  private readonly rules: any;
  private readonly name: string;
  private readonly awards: IAward[];
  fact!: object;

  constructor(
    rules: TopLevelCondition,
    name: string,
    awards: IAward[],
    option?: object
  ) {
    this.engine = new Engine();
    this.rules = commonUtil.setCompiledRulesEmbeded(rules);
    logger.info(`compiledRulesEmbeded: ${JSON.stringify(this.rules)}`);
    this.name = name;
    this.awards = awards;
    this.addRules(option);
  }

  private addRules(option?: object): void {
    const conditions: TopLevelCondition[] = [this.rules as TopLevelCondition];
    this.engine.addRule({
      conditions: {
        all: conditions
      },
      event: {
        type: this.name,
        params: {
          awards: this.awards,
          ...option
        }
      }
    });
  }

  async setFact(data: IActivity): Promise<void> {
    let values: { [key in Criteria]?: any } = {};
    Object.values(Criteria).forEach(item => {
      if (item in data.activityData) {
        values[item] = data.activityData[item];
      }
    });
    let dateExtracted = commonUtil.getDateMonthYear(
      data.activityDate,
      'Asia/Ho_Chi_Minh'
    );
    this.fact = {
      [Criteria.ACTIVITY_TYPE]: data.activityType,
      ...dateExtracted,
      ...values
    };
    logger.info(`Get fact ${JSON.stringify(this.fact)}`);
  }

  async run(): Promise<EngineResult> {
    return this.engine.run(this.fact);
  }
}
