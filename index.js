const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BGjj11BqxvyQBVjCJv0re2RQCraaFP3vGvwaA6nP4Tt65vgNjfF7Voy24EpYMswSYCMf6eiNIRfS2hk1n92-_wY";
const privateVapidKey = "kI_phBopIui4lhfUvzvkh2u8ly4k1Y53XGHsG3jH0jA";

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
