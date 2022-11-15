import { Request, Response } from "express";
import userLoginService from "../../services/login/userLogin.service";

const userLoginController = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const token = await userLoginService({ username, password });

  return response.status(200).json({ token });
};

export default userLoginController;
