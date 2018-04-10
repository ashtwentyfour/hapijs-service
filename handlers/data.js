'use strict';

const AWS = require('aws-sdk');
const Promise = require('bluebird');

const config = require('../config').config;

AWS.config.update({
    region: config.awsregion
});
const db = new AWS.DynamoDB.DocumentClient({});

let fetch_data = (id) => {
	return new Promise(function(resolve, reject) {

		const params = {
			TableName: config.Dynamo.Tables.Data,
			Key: {
				Id: id
			}
		};

		db.get(params, function(err, result) {
			if(err) {
				console.error("error fetching data", err);
				reject({
					statusCode: 500,
					body: "server error"
				});
				return;
			} else {
				if(!result.Item) {
					console.error("data point not found");
					reject({
						statusCode: 404,
						body: "data point not found"
					});
					return;
				}
				resolve(result.Item);
			}
		});

	});
};

exports.data = (request, reply) => {
	let res = fetch_data(request.params.id);
	res.then(function(d) {
		reply({
			statusCode: 200,
			body: {
				data: d,
				time: new Date().getTime().toString()
			}
		});
	}).catch(function(e) {
		if(!e.statusCode) {
			console.error(e);
			reply({
				statusCode: 500,
				body: e
			}).code(500);
		} else {
			reply(e).code(e.statusCode);
		}
	});
};