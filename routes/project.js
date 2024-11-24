const express = require('express');
const router = express.Router();
const db = require('../database/db');


function checkAuth(req, res, next) {
    if (req.session && req.session.userId) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
}

router.get('/data', (req, res) => {
      const stmt = db.prepare(`SELECT 
            emotions.*, 
            users.name 
        FROM emotions
        JOIN users ON emotions.userId = users.id`); 
      const data = stmt.all(); 
      res.json(data); 
  });

  
  router.get('/', (req, res) => {
    const isLoggedIn = req.session && req.session.userId;
    res.render('project', { user: isLoggedIn ? req.session.userId : null });
});


module.exports = router;
