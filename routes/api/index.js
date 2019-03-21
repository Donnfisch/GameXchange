const router = require("express").Router();
const passport = require("passport");

const gameRoutes = require("./games");
const inventoryRoutes = require("./inventory");
const authRoutes = require("./auth");

// game routes

router.use('/games', passport.authenticate('jwt', { session: false }), gameRoutes);
// router.use("/games", gameRoutes);
router.use('/inventory', passport.authenticate('jwt', { session: false }), inventoryRoutes);
// router.use("/inventory", inventoryRoutes);
router.use("/auth", authRoutes);

module.exports = router;
