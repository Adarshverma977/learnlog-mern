const express = require("express");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePhoto,
} = require("../controllers/profile.controller");

const isAuthenticated = require("../middleware/auth.middleware");

const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.get(
  "/me",
  isAuthenticated,
  getProfile
);

router.put(
  "/update",
  isAuthenticated,
  updateProfile
);

router.put(
  "/change-password",
  isAuthenticated,
  changePassword
);

router.post(
  "/upload-photo",
  isAuthenticated,
  upload.single("profilePhoto"),
  uploadProfilePhoto
);

module.exports = router;