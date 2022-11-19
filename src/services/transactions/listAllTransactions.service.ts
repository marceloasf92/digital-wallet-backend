import { Transactions } from "@prisma/client";
import { prisma } from "../../prisma/client";

const listTransactionsService = async (
  userId: number
): Promise<{
  creditedTransaction: Transactions[];
  debitedTransaction: Transactions[];
}> => {
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
