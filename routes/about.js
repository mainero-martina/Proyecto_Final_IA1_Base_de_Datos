const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca de' });
});

module.exports = router;
