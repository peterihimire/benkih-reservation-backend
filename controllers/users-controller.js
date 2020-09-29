// const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const User = require("../models/user");



// Signup controller
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Invalid signup inputs passed, please check your data.",
      422
    );
    return next(error);
  }

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User with that email already exist, please try again with another email.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: "images/PETER-HERO.jpg",
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed , please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    message: "Signup successful!",
    user: createdUser.toObject({ getters: true }),
  });
};

// Login controller
const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "User not identified, check credentials and try again.",
      401
    ); // 401 means authentication failed
  }
  res.json({ message: "Yes, you are Logged In!" });
};

exports.signup = signup;
exports.login = login;
