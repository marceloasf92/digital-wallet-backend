import { prisma } from "../../prisma/client";

const listTransactionsService = async (userId: number) => {
  const creditedTransaction = await prisma.transactions.findMany({
    where: {
      creditedAccountId: userId,
    },
    include: {
      debitedAccount: { include: { user: { select: { username: true } } } },
    },
  });

  const debitedTransaction = await prisma.transactions.findMany({
    where: {
      debitedAccountId: userId,
    },
    include: {
      creditedAccount: { include: { user: { select: { username: true } } } },
    },
  });

  return {
    sentTransaction: creditedTransaction,
    receivedTransaction: debitedTransaction,
  };
};

export default listTransactionsService;
