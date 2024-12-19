import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productFilterController,
  productCountController,
  productListcontroller,
  relatedProductController,
  searchProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter router

router.post("/product-filters", productFilterController)

//count product route

router.get("/product-count", productCountController)

//search
router.get('/search/:keyword', searchProductController);

router.get("/product-list/:page", productListcontroller);

router.get("/related-product/:pid/:cid", relatedProductController);

router.get("/product-category/:slug",productCategoryController)


//payment gateway route for token

router.get('/braintree/token', braintreeTokenController)
//Payment API

router.post('/braintree/payment', requireSignIn, braintreePaymentController)

//status Update


export default router;