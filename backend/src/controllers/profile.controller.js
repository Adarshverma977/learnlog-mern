const bcrypt = require("bcryptjs");

const sharp = require("sharp");

const User = require("../models/user.model");


// GET PROFILE
const getProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// UPDATE PROFILE
const updateProfile = async (req, res) => {

  try {

    const { name, email } = req.body;

    const user = await User.findById(
      req.user.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;

    user.email = email || user.email;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// CHANGE PASSWORD
const changePassword = async (req, res) => {

  try {

    const {
      oldPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(
      req.user.id
    );

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// UPLOAD PROFILE PHOTO
const uploadProfilePhoto = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const optimizedImagePath =
      `uploads/optimized-${req.file.filename}`;

    await sharp(req.file.path)
      .resize(300, 300)
      .jpeg({ quality: 80 })
      .toFile(optimizedImagePath);

    const user = await User.findById(
      req.user.id
    );

    user.profilePhoto = optimizedImagePath;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile photo uploaded successfully",
      profilePhoto: optimizedImagePath,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePhoto,
};