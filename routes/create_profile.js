const express = require('express');
const db = require('../database/db');

const router = express.Router();


router.get('/create_profile', (req, res) => {
    res.render('create_profile'); 
});

router.post('/create_profile', (req, res) => {
    const { name, surname, age, bio } = req.body;
    const userId = req.session.userId; 

    if (!userId) {
        return res.status(401).send('Por favor, inicia sesión primero.');
    }

    const stmt = db.prepare('UPDATE users SET name = ?,surname = ?, age = ?, bio = ? WHERE Id = ?');
    stmt.run(name, surname, age, bio, userId);

    res.redirect('/dashboard');
});

module.exports = router;
