import { Request, Response } from "express";
import userCreateService from "../../services/users/userCreate.service";
import accountCreateController from "../accounts/accountCreate.controller";
import accountDeleteController from "../accounts/accountDelete.controller";

const userCreateController = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const newAccount = await accountCreateController();

  const { id } = newAccount;

  const newUser = await userCreateService({ username, password, accounId: id });

  if (newUser) {
    return response.status(201).json(newUser);
  } else {
    const deleteAccount = await accountDeleteController({ id });
  }
};

export default userCreateController;
