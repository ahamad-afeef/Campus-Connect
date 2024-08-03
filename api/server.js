import express from "express";
import { config } from "dotenv";

const app = express();
config({ path: `.env.${process.env.NODE_ENV}` });

app.listen(process.env.PORT, () => {
  console.log(`The server is running on PORT ${process.env.PORT}`);
});
