const express = require('express');
const router = express.Router();


router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contacto' });
});

module.exports = router;
