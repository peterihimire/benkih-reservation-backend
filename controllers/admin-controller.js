// const { v4: uuidv4 } = require("uuid");
// import { v4 as uuidv4 } from "uuid";

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Room = require("../models/room");
const User = require("../models/user");

// const DUMMY_USERS = [
//   {
//     id: "u1",
//     name: "Peter Ihimire",
//     email: "peterihimire@gmail.com",
//     password: "123456",
//   },
// ];

// For getting all rooms
const getRooms = async (req, res, next) => {
  console.log("Get the room request");
  let rooms;
  try {
    rooms = await Room.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong , could not get rooms.",
      500
    );
    return next(error);
  }

  res.json({ rooms: rooms });
};

// For getting single room bt ID
const getRoomsById = async (req, res, next) => {
  const roomId = req.params.rid;
  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong , could not find a room.",
      500
    );
    return next(error);
  }

  // Using the HttpError model
  if (!room) {
    const error = new HttpError(
      "Could not find a room for the provided id lol.",
      404
    );
    return next(error);
  }

  res.json({ room: room.toObject({ getters: true }) });
};

// For create room
const createRoom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  // if (!req.file) {
  //   const error = new HttpError("No image provided .", 422);
  //   next(error);
  // }

  const name = req.body.name;
  const slug = req.body.slug;
  const type = req.body.type;
  const price = req.body.price;
  const size = req.body.size;
  const capacity = req.body.capacity;
  const pets = req.body.pets;
  const breakfast = req.body.breakfast;
  const featured = req.body.featured;
  const description = req.body.description;
  // const image = req.file.path;
  const extras = req.body.extras;

  const createdRoom = new Room({
    name,
    slug,
    type,
    price,
    size,
    capacity,
    pets,
    breakfast,
    featured,
    description,
    // image,
    // image: "http://localhost:8000/" + req.file.path,
    image: "images/PETER-HERO.jpg",
    extras,
  });

  // createdRoom
  //   .save()
  //   .then((result) => {
  //     room: result;
  //   })
  //   .catch((err) => console.log(err));

  try {
    await createdRoom.save();
  } catch (err) {
    const error = new HttpError("Creating room failed , please try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ message: "Room created successfully!", room: createdRoom });
};

// For update room
const updateRoomById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }

  const roomId = req.params.rid;
  const {
    name,
    slug,
    type,
    price,
    size,
    capacity,
    pets,
    breakfast,
    featured,
    description,
    extras,
  } = req.body;

  // const updatedRoom = { ...DUMMY_ROOMS.find((r) => r.id === roomId) };
  // const placeIndex = DUMMY_ROOMS.findIndex((r) => r.id === roomId);

  let updatedRoom;

  try {
    updatedRoom = await Room.findById(roomId);
    if (!updatedRoom) {
      const error = new HttpError("Could not find the room", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the room",
      500
    );
    return next(error);
  }

  updatedRoom.name = name;
  updatedRoom.slug = slug;
  updatedRoom.type = type;
  updatedRoom.price = price;
  updatedRoom.size = size;
  updatedRoom.capacity = capacity;
  updatedRoom.pets = pets;
  updatedRoom.breakfast = breakfast;
  updatedRoom.featured = featured;
  updatedRoom.description = description;
  updatedRoom.extras = extras;

  try {
    await updatedRoom.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong , could not update room ",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "Room updated successfully!",
    room: updatedRoom.toObject({ getters: true }),
  });
};

// For delete room
const deleteRoomById = async (req, res, next) => {
  const roomId = req.params.rid;

  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete place.", 500)
    );
  }
  try {
    await room.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong , deleting room not successful.",
      500
    );
    return next(error);
  }
  res.status(200);
  res.json({ message: "Room successfully deleted." });
};

// For getting Users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong , could not find user",
      500
    );
    return next(error);
  }

  res.status(200);
  res.json({ users: users });
};

// For getting  a single user
const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, user was not found.",
      500
    );
    return next(error);
  }

  res.status(200);
  res.json({ message: "successful", user: user });
};

exports.getRooms = getRooms;
exports.getRoomsById = getRoomsById;
exports.createRoom = createRoom;
exports.updateRoomById = updateRoomById;
exports.deleteRoomById = deleteRoomById;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
