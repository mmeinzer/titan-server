require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");
const cookieParser = require("cookie-parser");

const server = createServer();

server.express.use(cookieParser());

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
