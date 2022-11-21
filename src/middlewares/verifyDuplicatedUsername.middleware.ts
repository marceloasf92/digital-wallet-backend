import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appError";
import { prisma } from "../prisma/client";

const verifyDuplicatedUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;

  const verify = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (verify) {
    throw new AppError(409, "Username already exists!");
  }

  const characterCounterUsername = username.split("");

  if (characterCounterUsername.length < 3) {
    throw new AppError(409, "Username must have at least 3 characteres.");
  }

  next();
};

export default verifyDuplicatedUsername;
