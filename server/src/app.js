import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler} from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js";
import wishlistRouter  from "./routes/wishlist.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from  "./routes/order.route.js";
import dashboardRouter from "./routes/dashboard.route.js"
import healthRouter from "./routes/health.route.js"

const app = express();

// Middleware
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

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/dashboard",dashboardRouter);
app.use("/api/v1/health",healthRouter);


// Error Handler (Always Last)
app.use(errorHandler);

export default app;
