const HttpError = require("../models/http-error");
const Room = require("../models/room");

// const DUMMY_ROOMS = [
//   {
//     id: "r1",
//     name: "single economy",
//     slug: "single-economy",
//     type: "single",
//     price: 100,
//     size: 200,
//     capacity: 1,
//     pets: false,
//     breakfast: false,
//     featured: false,
//     description:
//       "This is the description of this room one , which is a single economy.",
//     extras: [
//       "Plush pillows and breathable bed",
//       "Full-sized, pH-balanced toiletries",
//       "internet",
//     ],
//   },
//   {
//     id: "r2",
//     name: "double economy",
//     slug: "double-economy",
//     type: "single",
//     price: 200,
//     size: 400,
//     capacity: 2,
//     pets: true,
//     breakfast: false,
//     featured: true,
//     description:
//       "This is the description of this room two , which is a double economy.",
//     extras: [
//       "Plush pillows and breathable bed",
//       "Full-sized, pH-balanced toiletries",
//       "internet",
//       "free breakfast",
//     ],
//   },
// ];

const getRooms = (req, res, next) => {
  console.log("Get the room request");
  res.json({ rooms: DUMMY_ROOMS });
};

const getRoomsById = (req, res, next) => {
  const roomId = req.params.rid;
  const room = DUMMY_ROOMS.find((r) => {
    return r.id === roomId;
  });

  // Using the express error middleware
  if (!room) {
    const error = new Error("Could not find a room for the provided idd.");
    error.code = 404;
    return next(error); // used for asynchronous code
  }

  res.json({ room });
};

exports.getRooms = getRooms;
exports.getRoomsById = getRoomsById;
