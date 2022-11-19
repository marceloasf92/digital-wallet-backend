import { Request, Response } from "express";
import userTransactionService from "../../services/transactions/usersTransaction.service";

const userTransactionController = async (
  request: Request,
  response: Response
) => {
  const { username, cashOut } = request.body;
  const { userId } = request;

  const transation = await userTransactionService({
    username,
    cashOut,
    userId,
  });

  return response.status(200).json({ transation });
};

export default userTransactionController;
