const { List, listJoiSchema } = require("../models/List");
const { Card } = require("../models/Card");

class ListsController {
  static async postLists(req, res) {
    const { name } = req.body;
    try {
        await listJoiSchema.validateAsync({ name });
    } catch (err) {
        return res.status(400).send({ message: err.details[0].message});
    }
    const list = await new List({ name, cards: [] });
    await list.save();
    return res.send({ message: "Success", data: list });
  }

  static async getLists(req, res) {
    const lists = await List.find().sort({ updatedAt: -1 }).populate("cards");
    if (!lists.length) {
      return res.send({ message: "Lists not found", data: [] });
    }
    return res.send({ message: "Success", data: lists });
  }

  static async deleteList(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Please provide id" });
    }
    const list = await List.findByIdAndDelete(id);
    if (list.cards.length) {
      for (let card of list.cards) {
        await Card.findByIdAndDelete(card);
      }
    }
    return res.send({ message: "Success", id });
  }
}

module.exports = ListsController;
