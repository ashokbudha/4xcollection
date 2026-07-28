import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {verifyAdmin} from "../middlewares/verifyAdmin.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";
import { getCategories,getCategory,createCategory,deleteCategory,updateCategory } from "../controllers/category.controller.js";

const router = Router();


router.route("/")
.post(verifyJWT,verifyAdmin,upload.fields([{name:"imageUrl",maxCount:1}]),createCategory)
.get(getCategories);

router.route("/:id")
.get(getCategory)
.patch(verifyJWT,verifyAdmin,upload.fields([{name:"imageUrl", maxCount:1,}]),updateCategory)
.delete(verifyJWT, verifyAdmin,deleteCategory);


export default router;
