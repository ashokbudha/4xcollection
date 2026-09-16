import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});



export default router;