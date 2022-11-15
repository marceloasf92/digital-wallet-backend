import { prisma } from "../prisma/client";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/appError";

const ensureAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Unauthorized");
  }

  const secret = process.env.SECRET_KEY;

  verify(token, <string>secret, (err, decoded) => {
    if (!decoded) {
      throw new AppError(401, "Unauthorized");
    }
    const { userId } = <any>decoded;

    request.userId = userId;
  });

  const userExists = await prisma.users.findUnique({
    where: { id: request.userId },
  });

  if (!userExists) {
    throw new AppError(401, "Unauthorized");
  }

  return next();
};
export default ensureAuth;
