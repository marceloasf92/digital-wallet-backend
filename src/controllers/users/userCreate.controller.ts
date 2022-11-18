import { Request, Response } from "express";
import AppError from "../../errors/appError";
import userCreateService from "../../services/users/userCreate.service";

const userCreateController = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const newUser = await userCreateService({
    username,
    password,
  });

  return response.status(201).json(newUser);
};

export default userCreateController;
