import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const accountListOneService = async (accountId: number) => {
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
