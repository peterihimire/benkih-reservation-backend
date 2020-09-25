const express = require("express");
const { check } = require("express-validator");

const adminControllers = require("../controllers/admin-controller");

const router = express.Router();

router.get("/rooms", adminControllers.getRooms);

router.get("/room/:rid", adminControllers.getRoomsById);

router.post(
  "/room",
  [
    check("name").not().isEmpty(),
    check("slug").not().isEmpty(),
    check("type").not().isEmpty(),
    check("price").isNumeric(),
    check("size").isNumeric(),
    check("capacity").isNumeric(),
    check("pets").isBoolean(),
    check("breakfast").isBoolean(),
    check("featured").isBoolean(),
    check("description").isLength({ min: 5 }),
    // check("image").not().isEmpty(),
    check("extras").isArray(),
  ],
  adminControllers.createRoom
);

router.patch(
  "/room/:rid",
  [
    check("name").not().isEmpty(),
    check("slug").not().isEmpty(),
    check("type").not().isEmpty(),
    check("price").isNumeric(),
    check("size").isNumeric(),
    check("capacity").isNumeric(),
    check("pets").isBoolean(),
    check("breakfast").isBoolean(),
    check("featured").isBoolean(),
    check("description").isLength({ min: 5 }),
    check("extras").isArray(),
  ],
  adminControllers.updateRoomById
);

router.delete("/room/:rid", adminControllers.deleteRoomById);

router.get("/users", adminControllers.getUsers);

// router.get("/user/:uid", adminControllers.getUser);

module.exports = router;
