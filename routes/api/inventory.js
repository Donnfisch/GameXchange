const router = require('express').Router();
const inventoryController = require('../../controllers/inventoryController');

// Matches with "/api/inventory..."

// User Inventory
router.route('/')
  .get(inventoryController.findAll)
  .put(inventoryController.upsertOrDelete);

// Trade Matches
router.route('/match/:direction')
  .get(inventoryController.findMatches);

module.exports = router;
