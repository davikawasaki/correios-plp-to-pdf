'use strict'

const { httpService } = require('../services')

const notImplementedError = (ctx) => {
    ctx.status = httpService.statusCodes.NotImplemented
}

module.exports = {
    notImplementedError
}
