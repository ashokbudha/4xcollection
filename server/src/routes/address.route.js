import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/address.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
  .post(addAddress)
  .get(getAddresses);

router.route("/:addressId")
  .patch(updateAddress)
  .delete(deleteAddress);

router.route("/:addressId/default")
  .patch(setDefaultAddress);

export default router;