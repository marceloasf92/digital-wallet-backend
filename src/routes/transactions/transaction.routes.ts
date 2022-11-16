import { Router } from "express";
import userTransactionController from "../../controllers/transactions/userTransaction.controller";
import ensureAuth from "../../middlewares/ensureAuth.middleware";

const transactionsRoutes = Router();

transactionsRoutes.post("/new", ensureAuth, userTransactionController);

export default transactionsRoutes;
