const router = require("express").Router();
const gameRoutes = require("./games");
const inventoryRoutes = require("./inventory");
const authRoutes = require("./auth");

// game routes
router.use("/games", gameRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/auth", authRoutes);

module.exports = router;
