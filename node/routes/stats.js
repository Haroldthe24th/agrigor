const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
/* GET stats. */
const getStats = async (req, res, next) => {
 try {
    const data = fs.readFileSync(path.join(__dirname, '../public/stats.json'));
    const stats = JSON.parse(data);
    console.log("stats",stats)
    console.log("req.params", req.params)
    const playerStats = stats.find(player => player.id === Number(req.params.id));
    if (!playerStats) {
      const err = new Error('Player stats not found');
      err.status = 404;
      throw err;
    }
    res.json(playerStats);
  } catch (e) {
    next(e);
  }
	}
router.get('/:id', getStats);

module.exports = router;
