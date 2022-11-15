import { IUserLogin } from "../../interfaces/login";
import { compare } from "bcryptjs";
import { sign as signJWT } from "jsonwebtoken";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const userLoginService = async ({ username, password }: IUserLogin) => {
  const user = await prisma.users.findUnique({ where: { username } });

  if (!user) {
    throw new AppError(401, "Wrong email/password");
  }
  const verify = await compare(password, user.password);
  if (!verify) {
    throw new AppError(401, "Wrong email/password");
  }

  const token = signJWT({ userId: user.id }, String(process.env.SECRET_KEY), {
    expiresIn: "1d",
  });

  return token;
};

export default userLoginService;
