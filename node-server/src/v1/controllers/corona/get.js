'use strict';
const fetch = require('node-fetch');
var data='';
const get = ({config}) => async (req, res, next) => {
	const baseUrl=config+req.query.countries;
		fetch(baseUrl)
		.then(response => response.json())
		.then(jsonData => {
			console.log
			res.status(200).json(jsonData);
		})
	 } 
	

module.exports = {get};