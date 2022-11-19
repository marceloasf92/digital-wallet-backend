import { prisma } from "../prisma/client";
import AppError from "../errors/appError";
import { Request, Response, NextFunction } from "express";

const usersBalance = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { cashOut } = request.body;
  const { userId } = request;

  const userCashOut = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      account: {},
    },
  });
  const positiveBalance = Number(userCashOut?.account.balance) - cashOut;

  if (positiveBalance < 0) {
    throw new AppError(401, "Negative balance.");
  }

  next();
};

export default usersBalance;
