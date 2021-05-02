const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-body')
const { koaSwagger } = require('koa2-swagger-ui')

const { swaggerRouter, plpRouter } = require('../routes')
const logger = require('../logging')

const start = async (_config) => {
  const config = _config ?? require('config')
  const corsOptions = { origin: '*' }
  const swaggerConfig = { swaggerOptions: { url: '/api/info', jsonEditor: true }, routePrefix: '/docs' }

  const app = new Koa()
  app.on('error', (e) => logger.error(e))
  app.use(cors(corsOptions))
  app.use(bodyParser())
  app.use(plpRouter.routes())
  app.use(swaggerRouter.routes())
  app.use(require('koa-simple-healthcheck')({
    path: config.endpoints.health
  }))
  app.use(koaSwagger(swaggerConfig))

  const PORT = process.env.PORT || config.port || 443

  return app.listen(PORT, () => {
    logger.info(`Server listening on port: ${PORT}`)
  })
}

module.exports = start
