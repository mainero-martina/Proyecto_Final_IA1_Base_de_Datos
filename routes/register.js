
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/db');

router.get('/register', (req, res) => {
  res.render('register'); 
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).send('El correo electrónico no es válido. Por favor, ingresa un correo válido.');}

  try {
      const existingUser = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(username, email);
      if (existingUser) {
          return res.status(400).send('El usuario o correo ya existe');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
      stmt.run(username, email, hashedPassword); 

      res.redirect('/confirmation'); 
  } catch (err) {
      console.error(err);
      res.status(500).send('Error al crear el usuario');
  }
});
router.get('/confirmation', (req, res) => {
  res.render('confirmation');
});

module.exports = router;
