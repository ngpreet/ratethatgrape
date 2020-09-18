const db = require('../models/index');
const Wine = db.wines;

exports.findAll = (req,res) => {
    Wine.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}