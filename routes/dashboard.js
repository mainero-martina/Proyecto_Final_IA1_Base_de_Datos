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


router.get('/', checkAuth, (req, res) => {
    const userId = req.session.userId;

    
    const userEmotions = db.prepare('SELECT * FROM emotions WHERE userId = ? ORDER BY id DESC LIMIT 1').get(userId);

    if (userEmotions) {
        
        res.render('dashboard', {
            username: req.session.username,
            userEmotions: userEmotions 
        });
    } else {
       
        res.render('dashboard', {
            username: req.session.username,
            userEmotions: {} 
        });
    }
});

router.post('/submit-emotions', (req, res) => {
    const userId = req.session.userId; 
    const { color, shape, movement, size } = req.body;

    if (!userId) {
        return res.status(401).send('Por favor, inicia sesión primero.');
    }

    const stmt = db.prepare('INSERT INTO emotions (userId, color, shape, movement, size) VALUES (?, ?, ?, ?, ?)');
    stmt.run(userId, color, shape, movement, size);
    const insertedData = db.prepare('SELECT * FROM emotions WHERE userId = ? ORDER BY id DESC').all(userId);
    console.log(insertedData);

    res.redirect('/project');

   
});

router.get('/project/data', (req, res) => {
    const userId = req.session.userId;

    const userEmotions = db.prepare('SELECT * FROM emotions WHERE userId = ? ORDER BY id DESC').all(userId);

    if (userEmotions) {
        res.json(userEmotions);
    } else {
        res.status(404).send('No se encontraron emociones para este usuario.');
    }
});

module.exports = router;
