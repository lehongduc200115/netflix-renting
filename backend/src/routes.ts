import pingController from './ping/ping.controller';
import userController from './user/user.controller';

const routes = [
  ...pingController,
  ...userController,
  // ...ruleEngineController,
  // ...campaignController
];

export { routes };