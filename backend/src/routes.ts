import pingController from './ping/ping.controller';
import userController from './user/user.controller';
import addTransaction from './addTransaction/addTransaction.controller';
import getTransactionController from './getTransaction/getTransaction.controller';
import updateTransactionController from './updateTransaction/updateTransaction.controller'

const routes = [
  ...pingController,
  ...userController,
  ...addTransaction,
  ...getTransactionController,
  ...updateTransactionController,
  // ...campaignController
];

export { routes };