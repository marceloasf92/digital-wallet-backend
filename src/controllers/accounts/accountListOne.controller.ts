import { Request, Response } from "express";
import accountListOneService from "../../services/accounts/accountListOne.service";

const accountListOneController = async (
  request: Request,
  response: Response
) => {
  const { accountId } = request;
  const balance = await accountListOneService(accountId);

  return response.status(200).json({ balance });
};

export default accountListOneController;
