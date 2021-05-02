'use strict'

const Readable = require('stream').Readable

const { schemaService, httpService, pdfService } = require('../services')
const { AdditionalService } = require('../entities')
const logger = require('../logging')

const generatePLPPDF = async ctx => {
    logger.info('Generating PLP as PDF...')

    const payload = ctx.request.body
    try {
        const validationRes = schemaService.validatePLPSchema({ payload })
        if (validationRes.errors) {
            logger.warn(`Payload is not valid due to schema problems. Payload: ${JSON.stringify(payload)}`)
            logger.warn(`Validation errors: ${JSON.stringify(validationRes.errors)}`)
            ctx.body = {
                msg: 'Invalid payload in the request',
                validation: validationRes.errors
            }
            ctx.status = httpService.statusCodes.BadRequest
            return
        }

        // Transforming number value
        if (payload?.shipper?.address?.number || payload?.shipper?.address?.number.toLowerCase() === 'sn') {
            payload.shipper.address.number = 's/ nº'
        }

        // Transforming volume number, quantity, invoice number, declared value and AR/MP/MD
        payload.shipments = payload.shipments.map(s => {
            s.volumeNumber = s.volumeQty = 1
            if (!s.invoiceNumber) s.invoiceNumber = ''
            s.ar = s.mp = s.vd = 'N'
            s.declaredValue = ''

            if (s?.additionalServices && s?.additionalServices?.length) {
                s.additionalServices.forEach(as => {
                    try {
                        as.value = parseFloat(as.value)
                    } catch (e) {
                        logger.error(e)
                        as.value = 0
                    }

                    if (as?.code === AdditionalService.SERVICE_AVISO_DE_RECEBIMENTO) {
                        s.ar = 'S'
                    } else if (as?.code === AdditionalService.SERVICE_MAO_PROPRIA) {
                        s.mp = 'S'
                    } else if (as?.value > 0) {
                        s.vd = 'S'
                        s.declaredValue = as.value
                    }
                })
            }

            return s
        })

        // Generate the PLP
        const plpBuffer = await pdfService.generatePLP({ plp: payload })

        // Buffer to stream
        const stream = new Readable()
        stream.push(plpBuffer)
        stream.push(null)

        ctx.body = stream
        ctx.status = httpService.statusCodes.Created
    } catch (e) {
        logger.error(e)
        ctx.body = { msg: 'Internal error while generating the PLP as PDF.' }
        ctx.status = httpService.statusCodes.InternalServerError
        return
    }
}

module.exports = {
    generatePLPPDF
}
