import { Router } from "express";
import listTransactionsController from "../../controllers/transactions/listTransactions.controller";
import userTransactionController from "../../controllers/transactions/userTransaction.controller";
import ensureAuth from "../../middlewares/ensureAuth.middleware";

const transactionsRoutes = Router();

transactionsRoutes.post("/new", ensureAuth, userTransactionController);
transactionsRoutes.get("/list", ensureAuth, listTransactionsController);

export default transactionsRoutes;
