const db = require("../models");

module.exports = {

  // Returns user's games along with have/want/trade status
  // TODO: Need to catch currentUser
  findAll: (req, res) => {
    const currentUser = "5272e292-3c40-4eea-a3df-707b760fdf00";
    db.inventory.findUserInventory(currentUser)
      .then(dbInventory => {
        res.json(dbInventory);
      });
  },

  // Matches users trades with others
  // TODO: Need to catch currentUser
  findMatches: (req, res) => {
    const currentUser = "5272e292-3c40-4eea-a3df-707b760fdf00";
    db.inventory.findMatches(currentUser, req.params.direction)
      .then(dbInventory => {
        res.json(dbInventory);
      });
  },

  // Add or update inventory items
  // TODO: catch currentUser
  // TODO: Pull ADD UUID to REACT to gen unique IDs
  // TODO: Create logic
  // TOTO: Bless the rains down in Africa
  insert: (req, res) => {
    // const currentUser = "5272e292-3c40-4eea-a3df-707b760fdf00";
    db.inventory.create(req.body)
      .then(dbInventory => res.json(dbInventory))
      .catch(err => res.status(422).json(err));
  },
};
