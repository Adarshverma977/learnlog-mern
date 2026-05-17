const express = require("express");

const cors = require("cors");

const cookieParser = require(
  "cookie-parser"
);

const helmet = require("helmet");

const compression = require(
  "compression"
);

const morgan = require("morgan");

const path = require("path");

const authRoutes = require(
  "./routes/auth.routes"
);

const journalRoutes = require(
  "./routes/journal.routes"
);

const dashboardRoutes = require(
  "./routes/dashboard.routes"
);

const profileRoutes = require(
  "./routes/profile.routes"
);

const app = express();


// MIDDLEWARES
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));


// STATIC
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);


// ROUTES
app.use("/api/auth", authRoutes);

app.use(
  "/api/journal",
  journalRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);


// HEALTH ROUTE
app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "LearnLog API Running Successfully",
  });

});


// 404 HANDLER
app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });

});

module.exports = app;