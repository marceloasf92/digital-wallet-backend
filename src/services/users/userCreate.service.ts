import { Users } from "@prisma/client";
import { hash } from "bcryptjs";
import AppError from "../../errors/appError";
import { IUserCreate } from "../../interfaces/users";
import { prisma } from "../../prisma/client";

const userCreateService = async ({
  username,
  password,
}: IUserCreate): Promise<Omit<Users, "password">> => {
  function exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  const regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;

  const testPassword = regex.test(password);

  if (!testPassword) {
    throw new AppError(
      403,
      "The password does not match what is expected from the pattern."
    );
  }

  const hashPassword = await hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      username,
      password: hashPassword,
      account: {
        create: {},
      },
    },
  });

  const userWithoutPassword = exclude(newUser, ["password"]);

  return userWithoutPassword;
};

export default userCreateService;
