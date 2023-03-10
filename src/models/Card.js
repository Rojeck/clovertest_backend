const mongoose = require("mongoose").default;
const Joi = require("joi");

const cardJoiSchema = Joi.object({
  name: Joi.string().min(4).max(30).required(),
});

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    listID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = { Card, cardJoiSchema };
