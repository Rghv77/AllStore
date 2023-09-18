import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes

//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id", //(Dynamic Routing) It's a common practice in web development to create meaningful and dynamic URLs to interact with different resources on the server.
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getAll category
router.get("/get-category", categoryController); //isme koi bhi authentication ke zarurat ni h, no need to paas middleware in this kuki all category hr kisi ko show hongi

//get single category
router.get("/single-category/:slug", singleCategoryController); // no authentication needed

//delete category
router.delete(
  "/delete-category/:id", // (Dynamic Routing) depends on unique ids
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
