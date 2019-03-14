const router = require("express").Router();
const inventoryController = require("../../controllers/inventoryController");

// Matches with "/api/inventory..."

// Return user's inventory
router.route("/")
  .get(inventoryController.findAll)
  .post(inventoryController.upsertOrDelete);

// Return trade matches
router.route("/match/")
  .get(inventoryController.findMatches);
router.route("/match/:direction")
  .get(inventoryController.findMatches);

module.exports = router;
