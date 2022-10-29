import pingController from './ping/ping.controller';

const routes = [
  ...pingController,
  // ...ruleEngineController,
  // ...campaignController
];

export { routes };