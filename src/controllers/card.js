const {List } = require("../models/List");
const {Card, cardJoiSchema} = require("../models/Card");

class CardController {
  static async deleteCard(req, res) {
    const { id } = req.params;
    const { listID } = req.query;
    if (!id || !listID) {
      return res.status(400).send({ message: "Please provide id and listID" });
    }

    await Card.findByIdAndDelete(id);
    const list = await List.findById(listID);
    list.cards = list.cards.filter((card) => card.toString() !== id);
    await list.save();
    return res.send({ message: "Success", id });
  }

  static async postCard(req, res) {
    const { name, listID } = req.body;
    if (!name || !listID) {
      return res.status(400).send({ message: "Provide name and listID" });
    }
    try {
        await cardJoiSchema.validateAsync({name});;
    } catch (err) {
        return res.status(400).send({ message: err.details[0].message});
    }
    const list = await List.findById(listID);
    if (!list) {
      return res.status(404).send({ message: "List not found" });
    }

    const card = await new Card({ name, listID }).save();
    list.cards.push(card._id);

    await list.save();
    return res.send({ message: "Success", data: card });
  }

  static async putCardStatus(req, res) {
    const { previousListID, listID, id } = req.body;
    if (!id || !listID || !previousListID) {
      return res
        .status(400)
        .send({ message: "Provide id, listID and previousListID" });
    }

    const prevList = await List.findById(previousListID);
    prevList.cards = prevList.cards.filter((card) => card.toString() !== id);
    await prevList.save();

    const list = await List.findById(listID);
    list.cards.push(id);
    await list.save();

    const card = await Card.findByIdAndUpdate(
      id,
      { listID },
      { returnDocument: "after" }
    );
    return res.send({ message: "Success", data: card });
  }
}

module.exports = CardController;
