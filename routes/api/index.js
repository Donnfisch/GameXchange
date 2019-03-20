const router = require("express").Router();
const gameRoutes = require("./games");
const inventoryRoutes = require("./inventory");
const passportRoutes = require("./passport");

// game routes
router.use("/games", gameRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/passport", passportRoutes);

module.exports = router;
