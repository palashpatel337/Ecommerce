import express, { Router }  from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, categoryProductController, createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoConroller, relatedProductController, searchProductController, updateProductController } from '../controllers/productConroller.js';
import formidable from 'express-formidable';
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

//ROUTES
//ADD NEW PRODUCT
router.post('/create-product',requireSignIn, isAdmin, upload.single("photo"), createProductController)

router.put('/update-product/:pid',requireSignIn, isAdmin, updateProductController)

//GET ALL PRODUCT
router.get('/get-product', getProductController)

router.get('/get-product/:slug', getSingleProductController)

router.get('/get-photo/:pid', productPhotoConroller)

router.delete('/delete-product/:pid',requireSignIn,isAdmin, deleteProductController)

router.post('/product-filters', productFiltersController)

router.get("/product-count", productCountController)

router.get("/product-list/:page", productListController)

router.get("/search/:keyword", searchProductController)

router.get("/related-product/:cid/:pid", relatedProductController)

router.get("/category-product/:slug", categoryProductController)

router.get("/braintree/token", braintreeTokenController)

router.post("/braintree/payment", requireSignIn, braintreePaymentController)

export default router;