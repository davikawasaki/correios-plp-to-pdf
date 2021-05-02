'use strict'

const config = require('config')
const jwt = require('jsonwebtoken')

const logger = require('../logging')
const { httpService } = require('../services')

const validateToken = async (ctx, next) => {
  logger.info('Validating token passed...')
  
  try {
    const token = ctx.request.headers.authorization
    const result = await jwt.verify(token, config.jwt.secretKey)

    if (!result || result !== config.jwt.secretValue) {
      logger.warn(`Invalid token or token value ${token}`)
      ctx.body = 'Invalid token or token value'
      ctx.status = httpService.statusCodes.Unauthorized
      return
    }
  } catch (e) {
    logger.error(e)
    ctx.body = { msg: 'Failed to validate token' }
    ctx.status = httpService.statusCodes.Unauthorized
    return
  }

  await next()
}

module.exports = {
    validateToken
}
