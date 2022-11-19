import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appError";
import { prisma } from "../prisma/client";

const userAllowedToTransfer = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, cashOut } = request.body;
  const { userId } = request;

  const userAllowed = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  if (userAllowed?.id === userId) {
    throw new AppError(405, "You are not allowed to transfer to yourself.");
  }

  if (cashOut <= 0) {
    throw new AppError(
      405,
      "You are not allowed to transfer negative balance."
    );
  }

  next();
};

export default userAllowedToTransfer;
