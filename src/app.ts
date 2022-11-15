import express from "express";
import usersRoutes from "./routes/users/users.routes";

const app = express();

app.use(express.json());

app.use("/user", usersRoutes);

app.get("/", (req, res) => {
  return res.send("Hello world!!!!");
});

export { app };
