import { Router } from "express";
import accountListOneController from "../../controllers/accounts/accountListOne.controller";
import ensureAuth from "../../middlewares/ensureAuth.middleware";

const accountsRoutes = Router();

accountsRoutes.get("/me", ensureAuth, accountListOneController);

export default accountsRoutes;
