import { Accounts } from "@prisma/client";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const accountListOneService = async (accountId: number): Promise<Accounts> => {
  const account = await prisma.accounts.findUnique({
    where: {
      id: accountId,
    },
  });

  if (!account) {
    throw new AppError(404, "Account does not exists!");
  }

  return account;
};

export default accountListOneService;
