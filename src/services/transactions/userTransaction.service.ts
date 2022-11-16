import { prisma } from "../../prisma/client";
import { ITransaction } from "../../interfaces/transactions";
import AppError from "../../errors/appError";

const userTransactionService = async ({
  username,
  cashOut,
  userId,
}: ITransaction) => {
  const userExist = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  const mineAccount = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  const mineAccountId = <number>mineAccount?.accounId;

  if (!userExist) {
    throw new AppError(401, "Username doesn't exist.");
  }

  const userBalance = await prisma.accounts.findUnique({
    where: {
      id: userExist.accounId,
    },
  });

  const positiveBalance = Number(userBalance?.balance) - cashOut;

  if (positiveBalance < 0) {
    throw new AppError(401, "Negative balance.");
  }

  await prisma.accounts.update({
    where: {
      id: userExist.accounId,
    },
    data: {
      balance: positiveBalance,
    },
  });

  const newTransaction = await prisma.transactions.create({
    data: {
      debitedAccountId: userExist.accounId,
      creditedAccountId: mineAccountId,
      value: positiveBalance,
    },
  });
  console.log(newTransaction);

  return newTransaction;
};

export default userTransactionService;
