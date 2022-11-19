import { Router } from "express";
import listAllTransactions from "../../controllers/transactions/listAllTransactions.controller";
import usersTransaction from "../../controllers/transactions/usersTransaction.controller";
import ensureAuth from "../../middlewares/ensureAuth.middleware";
import userAllowedToTransfer from "../../middlewares/userAllowedToTransfer.middleware";
import usersBalance from "../../middlewares/usersBalance.middleware";
import verifyIfUserExist from "../../middlewares/verifyIfUserExist.middleware";
import { expressYupMiddleware } from "express-yup-middleware";
import userTransactionsSchema from "../../validations/transactions/usersTransaction.validation";

const transactionsRoutes = Router();

transactionsRoutes.post(
  "/new",
  expressYupMiddleware({ schemaValidator: userTransactionsSchema }),
  ensureAuth,
  verifyIfUserExist,
  userAllowedToTransfer,
  usersBalance,
  usersTransaction
);
transactionsRoutes.get("/list", ensureAuth, listAllTransactions);

export default transactionsRoutes;
