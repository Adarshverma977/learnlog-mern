const mongoose = require("mongoose");

const Journal = require("../models/journal.model");


// DASHBOARD STATS
const getDashboardStats = async (req, res) => {

  try {

    const userId = new mongoose.Types.ObjectId(
      req.user.id
    );

    // TOTAL ENTRIES
    const totalEntries = await Journal.countDocuments({
      user: userId,
    });

    // TOTAL STUDY HOURS
    const totalHoursResult = await Journal.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalHours: {
            $sum: "$duration",
          },
        },
      },
    ]);

    const totalStudyHours =
      totalHoursResult[0]?.totalHours || 0;

    // RECENT TOPICS
    const recentTopics = await Journal.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("topicName difficulty duration createdAt");

    // WEEKLY SUMMARY
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 7
    );

    const weeklySummary = await Journal.aggregate([
      {
        $match: {
          user: userId,
          createdAt: {
            $gte: sevenDaysAgo,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalHours: {
            $sum: "$duration",
          },
          totalEntries: {
            $sum: 1,
          },
        },
      },
    ]);

    // PRODUCTIVITY DATA
    const productivityOverview =
      await Journal.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            totalHours: {
              $sum: "$duration",
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    return res.status(200).json({
      success: true,

      stats: {
        totalEntries,

        totalStudyHours,

        recentTopics,

        weeklySummary:
          weeklySummary[0] || {
            totalHours: 0,
            totalEntries: 0,
          },

        productivityOverview,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getDashboardStats,
};