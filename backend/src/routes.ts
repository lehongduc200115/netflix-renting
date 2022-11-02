import pingController from './ping/ping.controller';
import userController from './user/user.controller';
import transactionController from './transaction/transaction.controller';
import historyController from './history/history.controller'
import emailController from './email/email.controller';
import accountController from './account/account.controller';

const routes = [
  ...pingController,
  ...userController,
  ...transactionController,
  ...historyController,
  ...emailController,
  ...accountController,
];

export { routes };