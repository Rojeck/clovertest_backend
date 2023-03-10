const router = require("express").Router();
const controller = require("../controllers/lists");
const asyncWrapper = require("../utils/asyncWrapper");

router.get("/", asyncWrapper(controller.getLists));
router.post("/", asyncWrapper(controller.postLists));
router.delete("/:id", asyncWrapper(controller.deleteList));

module.exports = router;
