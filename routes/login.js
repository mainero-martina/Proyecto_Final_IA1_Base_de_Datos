const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../database/db'); 


router.get('/login', (req, res) => {
    res.render('login'); 
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    const user = stmt.get(username);

    
    if (user && await bcrypt.compare(password, user.password)) {
     
        req.session.userId = user.id;
        req.session.username = user.username;
        const isProfileComplete = user.name && user.surname && user.age && user.bio;

        
        if (!isProfileComplete) {
            res.redirect('/create_profile');
        } else {
            res.redirect('/dashboard');  
        }
    } else {
        res.render('login', { mensaje: 'Usuario o contraseña incorrectos' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); 
    });
});


module.exports = router;
