import { Router } from "express";
import {loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser} from  "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name:"avatar",
      maxCount:1
    },
  ]),
  registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)    //todo:some problem in refreshtoken
router.route("/me").get(verifyJWT,getCurrentUser);
router.route("/change-password").patch(verifyJWT,changeCurrentPassword);
//TODO: update profile and update avatar remaining

export default router