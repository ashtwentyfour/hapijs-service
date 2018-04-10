'use strict';

const getEnv = () => {
    if(!process.env.NODE_ENV) {
    	return 'PROD';
    } else {
    	return process.env.NODE_ENV;
    } 
};

const Fs = require('fs');
const Config = JSON.parse(Fs.readFileSync('./config.json', 'utf8'))[getEnv()];

exports.config = Config;