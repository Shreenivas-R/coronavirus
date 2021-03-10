'use strict'

const express = require('express');
const { errorHandler } = require('../../middleware/error-handler');
const corona = require('../controllers/corona');

const routersInit = (config) => {
	const router = express.Router();

	// Only accept Content-Type:application/json
	router.use(express.json({ extended: true }));

	router.use('/corona', corona( { config }));

	router.use(errorHandler);
	return router;

};

module.exports = routersInit;