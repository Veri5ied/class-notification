import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import webpush from "web-push";
import path from "path";
import { json, urlencoded } from "body-parser";
import { port } from "./port";

const app = express();

app.use(express.static(path.join(__dirname, "client")))

dotenv.config();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));

const publicVapidKey =
  "BGjj11BqxvyQBVjCJv0re2RQCraaFP3vGvwaA6nP4Tt65vgNjfF7Voy24EpYMswSYCMf6eiNIRfS2hk1n92-_wY";
const privateVapidKey = "kI_phBopIui4lhfUvzvkh2u8ly4k1Y53XGHsG3jH0jA";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/notify", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Push Test" });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.err(err));
});

export const start = async () => {
  try {
    app.listen(port);
    console.log(`Class notification is running on port ${port}`);
  } catch (err) {
    console.error(err);
  }
};
