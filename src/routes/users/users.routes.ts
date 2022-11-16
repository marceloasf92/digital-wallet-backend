import { Router } from "express";
import userLoginController from "../../controllers/login/userLogin.controller";
import userCreateController from "../../controllers/users/userCreate.controller";
import verifyDuplicatedEmail from "../../middlewares/verifyDuplicatedUsername.middleware";

const usersRoutes = Router();

usersRoutes.post("/signup", verifyDuplicatedEmail, userCreateController);
usersRoutes.post("/signin", userLoginController);

export default usersRoutes;
