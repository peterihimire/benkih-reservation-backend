const HttpError = require("../models/http-error");
// const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Peter Ihimire",
    email: "peterihimire@gmail.com",
    password: "123456",
  },
];

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

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user , email already exist.", 422); // code 422 code used for invalid user input
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ message: "User created", user: createdUser });
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
  6;
};

exports.signup = signup;
exports.login = login;
