import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appError";
import { prisma } from "../prisma/client";

const verifyIfUserExist = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username } = request.body;

  const userExist = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  if (!userExist) {
    throw new AppError(404, "Username doesn't exist.");
  }

  next();
};

export default verifyIfUserExist;
