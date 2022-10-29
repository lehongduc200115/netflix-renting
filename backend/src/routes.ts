import pingController from './ping/ping.controller';
import userController from './user/user.controller';
import addTransaction from './addTransaction/addTransaction.controller';

const routes = [
  ...pingController,
  ...userController,
  ...addTransaction,
  // ...ruleEngineController,
  // ...campaignController
];

export { routes };