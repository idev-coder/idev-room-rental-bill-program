var express = require('express');
var router = express.Router();
const invoices = require('../controllers/invoices')
const rooms = require('../controllers/rooms')
const units = require('../controllers/units')

const pathName = {
    invoices: invoices,
    rooms: rooms,
    units: units
}

/* GET home page. */
router.post('/:name/:key', async function (req, res, next) {
    switch (req.params.key) {
        case "findAll":
            res.status(200).json(await pathName[`${req.params.name}`][`${req.params.key}`](req.body.options))
            break;
        case "findByPk":
            res.status(200).json(await pathName[`${req.params.name}`][`${req.params.key}`](req.body.id))
            break;
        case "findOne":
            res.status(200).json(await pathName[`${req.params.name}`][`${req.params.key}`](req.body.options))
            break;
        case "create":
            res.status(200).json(await pathName[`${req.params.name}`][`${req.params.key}`](req.body.body))
            break;
        case "update":
            res.status(200).json(await pathName[`${req.params.name}`][`${req.params.key}`](req.body.body, req.body.options))
            break;
        case "destroy":
            res.status(200).json(await pathName[`${req.params.name}`][`${req.params.key}`](req.body.options))
            break;
        default:
            break;
    }


});

module.exports = router;
