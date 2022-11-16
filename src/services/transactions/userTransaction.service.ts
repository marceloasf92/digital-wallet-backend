import { prisma } from "../../prisma/client";
import { ITransaction } from "../../interfaces/transactions";
import AppError from "../../errors/appError";

const userTransactionService = async ({
  username,
  cashOut,
  userId,
}: ITransaction) => {
  const userCashIn = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  if (!userCashIn) {
    throw new AppError(401, "Username doesn't exist.");
  }

  if (userCashIn.id === userId) {
    throw new AppError(405, "You are not allowed to transfer to yourself.");
  }

  const userCashOut = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  const userCashOutId = <number>userCashOut?.accounId;

  const userBalance = await prisma.accounts.findUnique({
    where: {
      id: userCashIn?.accounId,
    },
  });

  const userCashOutBalance = await prisma.accounts.findUnique({
    where: {
      id: userCashOut?.accounId,
    },
  });

  const positiveBalance = Number(userCashOutBalance?.balance) - cashOut;
  const cashInBalance = Number(userBalance?.balance) + cashOut;

  if (positiveBalance < 0) {
    throw new AppError(401, "Negative balance.");
  }

  await prisma.accounts.update({
    where: {
      id: userCashIn.accounId,
    },
    data: {
      balance: cashInBalance,
    },
  });

  await prisma.accounts.update({
    where: {
      id: userCashOutId,
    },
    data: {
      balance: positiveBalance,
    },
  });

  const newTransaction = await prisma.transactions.create({
    data: {
      debitedAccountId: userCashIn.accounId,
      creditedAccountId: userCashOutId,
      value: cashOut,
    },
  });

  return newTransaction;
};

export default userTransactionService;
