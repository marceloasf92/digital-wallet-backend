import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const listTransactionsService = async (userId: number) => {
  const creditedTransaction = await prisma.transactions.findMany({
    where: {
      creditedAccountId: userId,
    },
  });

  const debitedTransaction = await prisma.transactions.findMany({
    where: {
      debitedAccountId: userId,
    },
  });

  return {
    creditedTransaction: creditedTransaction,
    debitedTransaction: debitedTransaction,
  };
};

export default listTransactionsService;
