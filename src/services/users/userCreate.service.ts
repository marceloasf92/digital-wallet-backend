import { IUserCreate } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { prisma } from "../../prisma/client";

const userCreateService = async ({
  username,
  password,
  accountId,
}: IUserCreate) => {
  const hashPassword = await hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      username,
      password: hashPassword,
      accountId,
    },
  });

  interface IPrivateInformationUser {
    username: string;
    password?: string;
  }

  const privateInformationUser: IPrivateInformationUser = { ...newUser };
  delete privateInformationUser.password;

  return privateInformationUser;
};

export default userCreateService;
