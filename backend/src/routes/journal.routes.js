const express = require("express");

const {
  createEntry,
  getAllEntries,
  getSingleEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/journal.controller");

const isAuthenticated = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  createEntry
);

router.get(
  "/all",
  isAuthenticated,
  getAllEntries
);

router.get(
  "/:id",
  isAuthenticated,
  getSingleEntry
);

router.put(
  "/update/:id",
  isAuthenticated,
  updateEntry
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  deleteEntry
);

module.exports = router;