const mongoose = require("mongoose").default;
const Joi = require("joi");

const listJoiSchema = Joi.object({
  name: Joi.string().min(4).max(30).required(),
});

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cards: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Card",
    },
  },
  { timestamps: true, versionKey: false }
);

const List = mongoose.model("List", listSchema);

module.exports = { List, listJoiSchema };
