'use strict'

const bunyan = require('bunyan')
const config = require('config')

const logger = bunyan.createLogger(config.get('log.opts'))

module.exports = logger
