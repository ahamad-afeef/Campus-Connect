import express from "express";
import { config } from "dotenv";
import signupRouter from "./routes/auth.router.js";

const app = express();
app.use(express.json());
config({ path: `.env.${process.env.NODE_ENV}` });

app.use("/api/auth/", signupRouter);

app.listen(process.env.PORT, () => {
  console.log(`The server is running on PORT ${process.env.PORT}`);
});
