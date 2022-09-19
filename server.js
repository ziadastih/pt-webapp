// =========IMPORTING ENV FILE ================
require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// ================== express ================
const express = require("express");

const server = express();
// ==============importing routes ====================
const authRoute = require("./routes/pTrouteAuth");
const ptClientRoute = require("./routes/ptClientRoute");
const workoutRoute = require("./routes/workoutRoute");
// ===============import connectdb ===========
const connectDB = require("./connectDb/connect");

//============= importing middleware error ======================================
const authCoach = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// =================trust proxy and rate limter function ============
server.set("trust proxy", 1);
server.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// ==============security ===========================

server.use(cors());
server.use(xss());
server.use(helmet());
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "cdn.jsdelivr.net/npm/axios/dist/axios.min.js "],
    },
  })
);
// ================routes ==========
server.use(express.static("./public/HOME-FILES"));
server.use(express.json());
server.use("/api/v1/auth", authRoute);
server.use("/api/v1/client", authCoach, ptClientRoute);
server.use("/api/v1/workout", authCoach, workoutRoute);

// ================= error handler =================== ================
server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

// ==================connect to db =======================
const start = async () => {
  try {
    await connectDB(process.env.PT_URI);
    server.listen(3000, () => {
      console.log("server is listening");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
