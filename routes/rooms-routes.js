const express = require("express");

const roomsControllers = require("../controllers/rooms-controller");

const router = express.Router();

router.get("/", roomsControllers.getRooms);

router.get("/:rid", roomsControllers.getRoomsById);

module.exports = router;
