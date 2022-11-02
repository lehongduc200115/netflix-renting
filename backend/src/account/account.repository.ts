import { AccountType } from './account.enum';
import { AccountModel } from './account.model';

export const findOneAndUpdateByType = async (type: AccountType) => {
  const account = await AccountModel.findOneAndUpdate(
    {
      type: type,
      slot: {
        $gt: 0,
      },
    },
    {
      $inc: {
        slot: -1,
      },
    },
    {
      new: true,
    }
  ).exec();

  if (!account) {
    throw new Error();
  }

  return {
    username: account.username,
    password: account.password,
  };
};

export const findOneByType = async (type: AccountType) => {
  const account = await AccountModel.findOne(
    {
      type: type,
      slot: {
        $gt: 0,
      },
    }
  ).exec();

  return {
    username: account?.username,
    password: account?.password,
  };
};


const AccountRepository = {
  findOneByType,
  findOneAndUpdateByType,
}

export default AccountRepository;