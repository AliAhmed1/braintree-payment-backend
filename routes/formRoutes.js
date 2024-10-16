const express = require('express');
const router = express.Router();
const { renderForm } = require('../controllers/formController');

router.get('/', renderForm);

module.exports = router;
