import { prisma } from "../../prisma/client";

const accountCreateService = async () => {
  const newAccount = await prisma.accounts.create({
    data: {
      balance: 100,
    },
  });

  return newAccount;
};

export default accountCreateService;
