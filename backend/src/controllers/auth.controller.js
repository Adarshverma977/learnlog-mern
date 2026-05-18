const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const User = require("../models/user.model");

const generateToken = require("../utils/generateToken");

const sendEmail = require("../utils/sendEmail");


// REGISTER
const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });

    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
      });

    // const token =
    //   generateToken(user._id);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge:
    //     7 *
    //     24 *
    //     60 *
    //     60 *
    //     1000,
    // });

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please Login",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// LOGIN
const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });

    }

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });

    }

    const token =
      generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge:
        7 *
        24 *
        60 *
        60 *
        1000,
    });

    return res.status(200).json({
      success: true,
      message:
        "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// LOGOUT
const logoutUser = async (
  req,
  res
) => {

  try {

    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message:
        "Logout successful",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// CURRENT USER
const getCurrentUser = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
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


// FORGOT PASSWORD
const forgotPassword = async (
  req,
  res
) => {

  try {

    const { email } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });

    }

    const resetToken =
      crypto
        .randomBytes(32)
        .toString("hex");

    user.resetPasswordToken =
      resetToken;

    user.resetPasswordExpire =
      Date.now() +
      15 * 60 * 1000;

    await user.save();

    const resetUrl =
      `http://localhost:5173/reset-password/${resetToken}`;

    const html = `
      <h2>Password Reset</h2>

      <p>Click below link to reset password:</p>

      <a href="${resetUrl}">
        ${resetUrl}
      </a>
    `;

    await sendEmail(
      user.email,
      "Password Reset",
      html
    );

    return res.status(200).json({
      success: true,
      message:
        "Reset link sent to email",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// RESET PASSWORD
const resetPassword = async (
  req,
  res
) => {

  try {

    const { token } =
      req.params;

    const { password } =
      req.body;

    const user =
      await User.findOne({

        resetPasswordToken:
          token,

        resetPasswordExpire: {
          $gt: Date.now(),
        },

      });

    if (!user) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired token",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    user.password =
      hashedPassword;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};