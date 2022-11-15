import { IUserCreate } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { prisma } from "../../prisma/client";

const userCreateService = async ({
  username,
  password,
  accounId,
}: IUserCreate) => {
  const hashPassword = await hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      username,
      password: hashPassword,
      accounId,
    },
  });

  return newUser;
};

export default userCreateService;
