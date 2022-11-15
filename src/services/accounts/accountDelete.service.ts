import { IAccountDelete } from "../../interfaces/accounts";
import { prisma } from "../../prisma/client";

const accountDeleteService = async ({ id }: IAccountDelete) => {
  const newAccount = await prisma.accounts.delete({ where: { id: id } });

  return newAccount;
};

export default accountDeleteService;
