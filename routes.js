'use strict';

const Joi = require('joi');
const Data = require('./handlers/data');

const cors_reply = (request, reply) => {
    return reply("success");
};

module.exports = [{
    method: 'GET',
    path: '/health',
    config: {
        cors: true,
        handler: function(request, reply) {
            reply("server running");
        }
    }
}, {
    method: 'OPTIONS',
    path: '/health',
    config: {
        cors: true,
        handler: cors_reply
    }
}, {
    method: 'GET',
    path: '/data/{id}',
    config: {
        cors: true,
        validate: {
          params: {
            id: Joi.string().required()
          }
        },
        handler: Data.data,
        tags: ['api']
    }
}, {
    method: 'OPTIONS',
    path: '/data',
    config: {
        cors: true,
        handler: cors_reply
    }
}];
