import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// The /login route simulates user authentication. Upon successful login, a JWT token is generated and sent in the response.
// The verifyToken middleware verifies the JWT token extracted from the Authorization header. If the token is valid, it adds the userId to the request object, allowing access to protected routes.
// The /protected route is a protected route that requires a valid token. The verifyToken middleware ensures that only users with a valid token can access this route.
//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; //client ka token verify hogya then usko uss JWT ki user_id ko reuest object m daal denge to allow access to the protected routes
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Invalid Token",
    });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
