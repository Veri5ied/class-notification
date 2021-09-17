"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _webPush = _interopRequireDefault(require("web-push"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = require("body-parser");

var _port = require("./port");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.static(_path.default.join(__dirname, "client")));

_dotenv.default.config();

app.disable("x-powered-by");
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _morgan.default)("dev"));
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
const publicVapidKey = "BGjj11BqxvyQBVjCJv0re2RQCraaFP3vGvwaA6nP4Tt65vgNjfF7Voy24EpYMswSYCMf6eiNIRfS2hk1n92-_wY";
const privateVapidKey = "kI_phBopIui4lhfUvzvkh2u8ly4k1Y53XGHsG3jH0jA";

_webPush.default.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

app.post("/notify", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({
    title: "Push Test"
  });

  _webPush.default.sendNotification(subscription, payload).catch(err => console.err(err));
});

const start = async () => {
  try {
    app.listen(_port.port);
    console.log(`Class notification is running on port ${_port.port}`);
  } catch (err) {
    console.error(err);
  }
};

exports.start = start;