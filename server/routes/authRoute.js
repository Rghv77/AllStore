import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//routing on registration . Method will be post
router.post("/register", registerController);
console.log("ghus"); // we are following MVC pattern that's why we will be importing the controller instead of callback function

//routing on Login . Method will be post
router.post("/login", loginController);

//Forgot password || Post
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth (authentication check while going before protected route)
router.get("/user-auth", requireSignIn, (req, res) => {
  //last wala m controller kr skte the but one line h isliye yhi krdiya
  res.status(200).send({ ok: true });
}); //agr response m ok true rha tbhi user dashboard pafge ko access kr skta h

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
