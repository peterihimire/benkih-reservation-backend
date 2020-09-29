const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const roomsRoutes = require("./routes/rooms-routes");
const adminRoutes = require("./routes/admin-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/uploads/images", express.static(path.join("uploads", "images")));

// => /api/rooms/
app.use("/api/rooms", roomsRoutes);

// => /api/admin/
app.use("/api/admin", adminRoutes);

// => /api/users/
app.use("/api/user", usersRoutes);

// Error handling for unregistered routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route!", 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const PORT = 8000;

mongoose
  .connect(
    "mongodb+srv://peter:Y3vMqWvHfCYlEeH8@p-cluster.4rp62.mongodb.net/hotel?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
