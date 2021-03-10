
'use strict'

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const { errorHandler } = require('./src/middleware/error-handler');
const { NotFoundError } = require('rest-api-errors');
const debug = {
  info: require('debug')('myAppName:api:server'),
};
var cors = require('cors')
const config = require('./src/config/coronaconfig');


const api1 = require('./src/v1/api');


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api/v1', api1(config));



//If nothing matches, throw 404
app.use(function (req, res, next) {
	const err = new NotFoundError('404', 'The requested resource is not available');
	next(err);
});

app.use(errorHandler);

module.exports = app;

