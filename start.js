'use strict';

const Server = require('./index');
const Pack = require('./package.json');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

Server((err, server) => {
    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Server running at:", server.info.uri);
        }
    });
});
