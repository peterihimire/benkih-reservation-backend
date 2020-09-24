// const { v4: uuidv4 } = require("uuid");
// import { v4 as uuidv4 } from "uuid";

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_ROOMS = [
  {
    id: "r1",
    name: "single economy",
    slug: "single-economy",
    type: "single",
    price: 100,
    size: 200,
    capacity: 1,
    pets: false,
    breakfast: false,
    featured: false,
    description:
      "This is the description of this room one , which is a single economy.",
    extras: [
      "Plush pillows and breathable bed",
      "Full-sized, pH-balanced toiletries",
      "internet",
    ],
  },
  {
    id: "r2",
    name: "double economy",
    slug: "double-economy",
    type: "single",
    price: 200,
    size: 400,
    capacity: 2,
    pets: true,
    breakfast: false,
    featured: true,
    description:
      "This is the description of this room two , which is a double economy.",
    extras: [
      "Plush pillows and breathable bed",
      "Full-sized, pH-balanced toiletries",
      "internet",
      "free breakfast",
    ],
  },
];

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Peter Ihimire",
    email: "peterihimire@gmail.com",
    password: "123456",
  },
];

// For getting all rooms
const getRooms = (req, res, next) => {
  console.log("Get the room request");
  res.json({ rooms: DUMMY_ROOMS });
};

// For getting single room
const getRoomsById = (req, res, next) => {
  const roomId = req.params.rid;
  const room = DUMMY_ROOMS.find((r) => {
    return r.id === roomId;
  });

  // // Using the express error middleware
  // if (!room) {
  //   const error = new Error("Could not find a room for the provided id.");
  //   error.code = 404;
  //   throw error; // used for synchronous code
  // }

  // Using the HttpError model
  if (!room) {
    throw new HttpError("Could not find a room for the provided id lol.", 404);
  }

  res.json({ room }); // { room } => {room : room}
};
// function getRooms(){...}
// const getRooms = function(){...}

// For create room
const createRoom = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

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
  // const name = req.body.name;

  const createdRoom = {
    // id: uuidv4(),
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
  };

  DUMMY_ROOMS.push(createdRoom);

  res.status(201).json({ room: createdRoom });
};

// For update room
const updateRoomById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
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

  const updatedRoom = { ...DUMMY_ROOMS.find((r) => r.id === roomId) };
  const placeIndex = DUMMY_ROOMS.findIndex((r) => r.id === roomId);
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

  DUMMY_ROOMS[placeIndex] = updatedRoom;

  res.status(200).json({ room: updatedRoom });
};

// For delete room
const deleteRoomById = (req, res, next) => {
  const roomId = req.params.rid;

  if (!DUMMY_ROOMS.find((r) => r.id === roomId)) {
    throw new HttpError("Could not find a room for that id.", 404);
  }
  DUMMY_ROOMS = DUMMY_ROOMS.filter((r) => {
    return r.id !== roomId;
  });
  res.status(200);
  res.json({ message: "Room successfully deleted.", DUMMY_ROOMS });
};

// For getting Users
const getUsers = (req, res, next) => {
  res.status(200);
  res.json({ users: DUMMY_USERS });
};

exports.getRooms = getRooms;
exports.getRoomsById = getRoomsById;
exports.createRoom = createRoom;
exports.updateRoomById = updateRoomById;
exports.deleteRoomById = deleteRoomById;
exports.getUsers = getUsers;
