require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const server = createServer();
server.express.use(cookieParser());
server.express.use(bodyParser.json());
server.express.use((req, res, next) => {
  console.log(req.body);
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  details => {
    console.log(
      `\nServer running on port ${
        details.port
      } - ${new Date().toLocaleTimeString("en-US")}`
    );
  }
);
