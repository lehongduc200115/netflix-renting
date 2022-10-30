import pingController from './ping/ping.controller';
import userController from './user/user.controller';
import addTransaction from './addTransaction/addTransaction.controller';
import getTransactionController from './getTransaction/getTransaction.controller';
import updateTransactionController from './updateTransaction/updateTransaction.controller'
import historyController from './history/history.controller'

const routes = [
  ...pingController,
  ...userController,
  ...addTransaction,
  ...getTransactionController,
  ...updateTransactionController,
  ...historyController
  // ...campaignController
];

export { routes };