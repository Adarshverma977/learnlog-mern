const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const isAuthenticated = require(
  "../middleware/auth.middleware"
);

const router =
  express.Router();


// AUTH
router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/logout",
  logoutUser
);


// USER
router.get(
  "/me",
  isAuthenticated,
  getCurrentUser
);


// FORGOT PASSWORD
router.post(
  "/forgot-password",
  forgotPassword
);


// RESET PASSWORD
router.put(
  "/reset-password/:token",
  resetPassword
);


module.exports = router;