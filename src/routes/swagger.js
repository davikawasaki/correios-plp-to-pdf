'use strict'

const Router = require('@koa/router')
const swaggerJsdoc = require('swagger-jsdoc')
const router = new Router()

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    openapi: '3.0.1',
    info: {
      title: 'Correios PLP to PDF API',
      version: '1.0.0',
      description: 'Correios PLP to PDF API endpoints documentation generated with Swagger'
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'authorization'
        }
      }
    },
    tags: [
      {
        name: 'correios-plp-to-pdf',
        externalDocs: {
          description: 'Code base',
          url: 'https://github.com/davikawasaki/correios-plp-to-pdf'
        }
      }
    ]
  },
  apis: ['src/routes/*.js']
}
const specs = swaggerJsdoc(options)

router.get('/api/info', async ctx => {
  ctx.body = JSON.stringify(specs)
})

module.exports = router
