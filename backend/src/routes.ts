import pingController from './ping/ping.controller';
import userController from './user/user.controller';
import transactionController from './transaction/transaction.controller';
import historyController from './history/history.controller'
import sendMailController from './sendMail/sendMail.controller';
import getNetflixAccController from './account/getNetflixAcc.controller';

const routes = [
  ...pingController,
  ...userController,
  ...transactionController,
  ...historyController,
  ...sendMailController,
  ...getNetflixAccController,
];

export { routes };