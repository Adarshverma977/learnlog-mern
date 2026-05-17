const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/dashboard.controller");

const isAuthenticated = require("../middleware/auth.middleware");

const router = express.Router();

router.get(
  "/stats",
  isAuthenticated,
  getDashboardStats
);

module.exports = router;