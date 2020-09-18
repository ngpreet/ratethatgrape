module.exports = app => {
    const wines = require('../controllers/wine.controller.js');
    
    var router = require('express').Router();

    router.get('/', wines.findAll);

    app.use('/api/wines', router);
}