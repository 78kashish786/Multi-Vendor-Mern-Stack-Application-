import  express from "express";
import { createCategoryController ,deleteCategoryController , updateCategoryController,categoryController,singleCategoryController} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const  router= express.Router();

//routes create-category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController)

//routes for  update-category

router.put("/update-category/:id", requireSignIn,isAdmin, updateCategoryController);

//routes for gwtting all users

router.get("/get-category", categoryController);

//getting single category

router.get("/single-category/:slug", singleCategoryController)

//deleting route for category

router.delete("/delete-category/:id", requireSignIn,deleteCategoryController)

export default router;