const router = require("express").Router();
const gameRoutes = require("./games");
const inventoryRoutes = require("./inventory");

// game routes
router.use("/games", gameRoutes);
router.use("/inventory", inventoryRoutes);

module.exports = router;
