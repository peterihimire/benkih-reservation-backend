// const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const User = require("../models/user");

// const DUMMY_USERS = [
//   {
//     id: "u1",
//     name: "Peter Ihimire",
//     email: "peterihimire@gmail.com",
//     password: "123456",
//   },
// ];

// Signup controller
const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError(
      "Invalid signup inputs passed, please check your data.",
      422
    );
  }

  const { name, email, password } = req.body;

  const existingUser = User.findOne({ email: email })
    .then((result) => {
      if (existingUser) {
        const error = new HttpError(
          "User with that email already exist, please try again with another email.",
          422
        );
        return next(error);
      }
    })
    .catch((err) => {
      const error = new HttpError(
        "Something went wrong, signing up failed , please try again later.",
        500
      );
      return next(error);
    });

  // if(existingUser)

  const createdUser = new User({
    name,
    email,
    image: "images/PETER-HERO.jpg",
    password,
  });

  createdUser
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "User created", user: result });
    })
    .catch((err) => {
      const error = new HttpError(
        "Something went wrong , could not create new user",
        500
      );
      next(error);
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
