import { Request, Response } from "express";
import AppError from "../../errors/appError";
import userCreateService from "../../services/users/userCreate.service";
import accountCreateController from "../accounts/accountCreate.controller";

const userCreateController = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const newAccount = await accountCreateController();

  const newUser = await userCreateService({
    username,
    password,
    accountId: newAccount.id,
  });

  return response.status(201).json(newUser);
};

export default userCreateController;
