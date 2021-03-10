'use strict'

const express = require('express');

const {get} = require('./get');

module.exports = ({config}) => {
	var api = express.Router();
	api.get('/', get({config}));

	return api;
};