"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = require("body-parser");

var _port = require("./port");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_dotenv.default.config();

app.disable("x-powered-by");
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _morgan.default)("dev"));
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));

const start = async () => {
  try {
    app.listen(_port.port);
    console.log(`Class notification is running on port ${_port.port}`);
  } catch (err) {
    console.error(err);
  }
};

exports.start = start;