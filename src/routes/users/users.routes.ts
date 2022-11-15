import { Router } from "express";
import userLoginController from "../../controllers/login/userLogin.controller";
import userCreateController from "../../controllers/users/userCreate.controller";

const usersRoutes = Router();

usersRoutes.post("/signup", userCreateController);
usersRoutes.post("/signin", userLoginController);

export default usersRoutes;
