import { Request, Response } from "express";
import listTransactionsService from "../../services/transactions/listTransactions.service";

const listTransactionsController = async (
  request: Request,
  response: Response
) => {
  const { userId } = request;
  const transactions = await listTransactionsService(userId);

  return response.status(200).json({ transactions });
};
export default listTransactionsController;
