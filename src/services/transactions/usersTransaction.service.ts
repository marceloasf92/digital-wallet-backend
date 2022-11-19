import { prisma } from "../../prisma/client";
import { ITransaction } from "../../interfaces/transactions";
import { Transactions } from "@prisma/client";

const userTransactionService = async ({
  username,
  cashOut,
  userId,
}: ITransaction): Promise<Transactions> => {
  const userCashOut = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      accountId: true,
      account: {
        select: {
          id: true,
          balance: true,
        },
      },
    },
  });

  const userCashIn = await prisma.users.findUnique({
    where: { username: username },
    select: {
      id: true,
      accountId: true,
      account: {
        select: {
          id: true,
          balance: true,
        },
      },
    },
  });

  const cashOutBalance = Number(userCashOut?.account.balance) - cashOut;
  const cashInBalance = Number(userCashIn?.account.balance) + cashOut;

  await prisma.accounts.update({
    where: {
      id: userCashIn?.accountId,
    },
    data: {
      balance: cashInBalance,
    },
  });

  await prisma.accounts.update({
    where: {
      id: userCashOut?.accountId,
    },
    data: {
      balance: cashOutBalance,
    },
  });

  const newTransaction = await prisma.transactions.create({
    data: {
      debitedAccountId: <number>userCashIn?.accountId,
      creditedAccountId: <number>userCashOut?.accountId,
      value: cashOut,
    },
  });

  return newTransaction;
};

export default userTransactionService;
