const express = require('express');
const router = express.Router();

const getTrashBins = require('../controllers/getTrashBins');

router.get('/', getTrashBins);

module.exports = router;