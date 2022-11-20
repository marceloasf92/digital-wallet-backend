import "express-async-errors";
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware";
import accountsRoutes from "./routes/accounts/accounts.routes";
import transactionsRoutes from "./routes/transactions/transaction.routes";
import usersRoutes from "./routes/users/users.routes";
const app = express();

/*To allow requests at the server */
app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());

app.use("/user", usersRoutes);
app.use("/account", accountsRoutes);
app.use("/transaction", transactionsRoutes);

app.use(errorHandler);

export { app };
