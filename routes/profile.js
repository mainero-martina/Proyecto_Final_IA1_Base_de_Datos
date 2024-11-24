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


router.get('/profile', checkAuth, (req, res) => {
  
  const userId = req.session.userId;
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  const user = stmt.get(userId);

  if (user) {
    
    res.render('profile', { user });
  } else {
    
    res.redirect('/login');
  }
});

module.exports = router;
