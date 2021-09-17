import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import { port } from "./port";

const app = express();

dotenv.config();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));

export const start = async () => {
  try {
    app.listen(port);
    console.log(`Class notification is running on port ${port}`);
  } catch (err) {
    console.error(err);
  }
};
