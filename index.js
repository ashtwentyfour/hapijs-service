'use strict'; // eslint-disable-line no-multi-assign

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const Routes = require('./routes');
const Pack = require('./package.json');

module.exports = function (callback) {
    const server = new Hapi.Server();
    server.connection({
        port: process.env.PORT || 8081,
        host: "0.0.0.0"
    });

    const options = {
        info: {
            title: "Hapi Example Documentation",
            version: Pack.version
        }
    };

    server.register([
        Inert,
        Vision,
        {
            register: HapiSwagger,
            options
        }], (err) => {
        if (err) {
            console.log(err);
        }
    });

    server.route(Routes);

    callback(null, server);
    
};
