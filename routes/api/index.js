const router = require('express').Router();
const passport = require('passport');

const gameRoutes = require('./games');
const inventoryRoutes = require('./inventory');
const userRoutes = require('./user');
const authRoutes = require('./auth');

router.use('/games', passport.authenticate('jwt', { session: false }), gameRoutes);
router.use('/inventory', passport.authenticate('jwt', { session: false }), inventoryRoutes);
router.use('/user', authRoutes);
router.use('/user', passport.authenticate('jwt', { session: false }), userRoutes);

module.exports = router;
