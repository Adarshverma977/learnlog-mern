const Journal = require("../models/journal.model");


// CREATE ENTRY
const createEntry = async (req, res) => {

  try {

    const {
      topicName,
      description,
      duration,
      difficulty,
    } = req.body;

    if (
      !topicName ||
      !description ||
      !duration ||
      !difficulty
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const entry = await Journal.create({
      user: req.user.id,
      topicName,
      description,
      duration,
      difficulty,
    });

    return res.status(201).json({
      success: true,
      message: "Entry created successfully",
      entry,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// GET ALL ENTRIES
const getAllEntries = async (req, res) => {

  try {

    const { search, difficulty, date } = req.query;

    let query = {
      user: req.user.id,
    };

    // SEARCH
    if (search) {
      query.topicName = {
        $regex: search,
        $options: "i",
      };
    }

    // FILTER DIFFICULTY
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // FILTER DATE
    if (date) {

      const startDate = new Date(date);

      const endDate = new Date(date);

      endDate.setDate(endDate.getDate() + 1);

      query.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const entries = await Journal.find(query)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: entries.length,
      entries,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// GET SINGLE ENTRY
const getSingleEntry = async (req, res) => {

  try {

    const entry = await Journal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      entry,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// UPDATE ENTRY
const updateEntry = async (req, res) => {

  try {

    const entry = await Journal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    const updatedEntry = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      updatedEntry,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// DELETE ENTRY
const deleteEntry = async (req, res) => {

  try {

    const entry = await Journal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    await Journal.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Entry deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


module.exports = {
  createEntry,
  getAllEntries,
  getSingleEntry,
  updateEntry,
  deleteEntry,
};