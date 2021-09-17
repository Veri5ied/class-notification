const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = process.env.publicVapidKey;
const privateVapidKey = process.env.privateVapidKey;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Push Notification" });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
