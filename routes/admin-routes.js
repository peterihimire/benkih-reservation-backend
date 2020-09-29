const express = require("express");
const { check } = require("express-validator");

const adminControllers = require("../controllers/admin-controller");
// const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/rooms", adminControllers.getRooms);

router.get("/room/:rid", adminControllers.getRoomsById);

router.post(
  "/room",
  // fileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("slug")
      .not()
      .isEmpty()
      .withMessage("Please name should not be empty."),
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

router.put(
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

router.get("/user/:uid", adminControllers.getUserById);

module.exports = router;
