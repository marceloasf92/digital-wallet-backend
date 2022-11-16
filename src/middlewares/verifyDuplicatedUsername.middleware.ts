import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appError";
import { prisma } from "../prisma/client";

const verifyDuplicatedEmail = async (
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

  next();
};

export default verifyDuplicatedEmail;
