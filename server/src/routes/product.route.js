import  {Router} from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/")
.get(getAllProducts)
.post(verifyJWT,verifyAdmin,upload.fields([{name:"thumbnail",maxCount:1},{name:"variantImages",maxCount:20}]),createProduct);

router.route("/:id")
.get(getProductById)
.patch(verifyJWT,verifyAdmin, updateProduct)
.delete(verifyJWT, verifyAdmin, deleteProduct)

export default router;