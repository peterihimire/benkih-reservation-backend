const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pets: { type: Boolean, required: true },
    breakfast: { type: Boolean, required: true },
    featured: { type: Boolean, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    extras: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
