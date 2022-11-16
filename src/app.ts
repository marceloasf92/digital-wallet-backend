import "express-async-errors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import accountsRoutes from "./routes/accounts/accounts.routes";
import transactionsRoutes from "./routes/transactions/transaction.routes";
import usersRoutes from "./routes/users/users.routes";

const app = express();

app.use(express.json());

app.use("/user", usersRoutes);
app.use("/account", accountsRoutes);
app.use("/transaction", transactionsRoutes);

app.use(errorHandler);

export { app };
