const config = require('config')
const server = require('./server')

module.exports = server(config)
