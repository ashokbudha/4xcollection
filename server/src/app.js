import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler} from "./middlewares/error.middleware.js";

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware
app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json([
   "pant",
   "shirt",
   "shoe"
  ]);
});


// Error Handler (Always Last)
app.use(errorHandler);

export default app;
