const router = require("express").Router();
const controller = require("../controllers/card");
const asyncWrapper = require("../utils/asyncWrapper");

router.post("/", asyncWrapper(controller.postCard));
router.delete("/:id", asyncWrapper(controller.deleteCard));
router.put("/status", asyncWrapper(controller.putCardStatus));

module.exports = router;
