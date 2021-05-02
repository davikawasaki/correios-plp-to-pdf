const config = require('config')
const Router = require('@koa/router')
const controllers = require('../controllers')

const router = new Router()

/**
 * @openapi
 *
 * /plp:
 *  post:
 *      tags:
 *      - "correios-plp-to-pdf"
 *      summary: Generate a Correios PLP in PDF
 *      description: Receives a correios posting pre-list to create a PDF file from it
 *      responseClass: PLP
 *      nickname: plp
 *      produces:
 *        - "application/json"
 *      requestBody:
 *          description: "PLP with all necessary information to be printed"
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/definitions/PLP"
 *      responses:
 *        "401":
 *          description: "Unauthorized"
 *        "400":
 *          description: "Bad Request"
 *        "500":
 *          description: "Internal Server Error"
 *        "201":
 *          description: "Created"
 *          schema:
 *            type: "string"
 * definitions:
 *  PLP:
 *    type: "object"
 *    properties:
 *      code:
 *        description: "PLP identifier"
 *        required: true
 *        type: "string"
 *        default: "1619750448"
 *        pattern: '^\\d+$'
 *      contractNumber:
 *        description: "Correios contract number that covers this shipment"
 *        required: true
 *        type: "string"
 *        maxLength: 20
 *        default: "9912208555"
 *        pattern: '^\\d+$'
 *      administrativeNumber:
 *        description: "Correios administrative number that covers this shipment"
 *        required: true
 *        type: "string"
 *        maxLength: 9
 *        default: "08082650"
 *        pattern: '^\\d+$'
 *      postalCardNumber:
 *        description: "Correios postal card number that covers this shipment"
 *        required: true
 *        type: "string"
 *        maxLength: 10
 *        default: "0057018901"
 *        pattern: '^\\d+$'
 *      shipper:
 *        description: "Shipper data related to this PLP"
 *        required: true
 *        type: "object"
 *        $ref: "#/definitions/PLPShipper"
 *      shipments:
 *        description: "List of shipments related to this PLP"
 *        required: true
 *        type: "array"
 *        items:
 *          $ref: "#/definitions/PLPShipment"
 *  PLPShipper:
 *    type: "object"
 *    properties:
 *      name:
 *        description: "Company name that ships the shipment"
 *        required: true
 *        type: "string"
 *        default: "Google Brasil"
 *      phoneNumber:
 *        description: "Company phone number that ships the shipment (only numbers)"
 *        type: "string"
 *        minLength: 11
 *        maxLength: 11
 *        default: "11999750427"
 *        pattern: '^\\d+$'
 *      address:
 *        description: "Shipper address properties"
 *        required: true
 *        type: "object"
 *        $ref: "#/definitions/PLPShipperAddress"
 *  PLPShipperAddress:
 *    type: "object"
 *    properties:
 *      street:
 *        description: "Shipper street address"
 *        required: true
 *        type: "string"
 *        maxLength: "50"
 *        default: "Av. Brigadeiro Faria Lima"
 *      number:
 *        description: "Shipper street address number (sn for empty number)"
 *        type: "string"
 *        maxLength: "18"
 *        default: "3900"
 *      complement:
 *        description: "Shipper street address complement"
 *        type: "string"
 *        maxLength: "30"
 *        default: "5º andar"
 *      neighborhood:
 *        description: "Shipper neighborhood address"
 *        required: true
 *        type: "string"
 *        maxLength: "30"
 *        default: "Itaim"
 *      city:
 *        description: "Shipper city address"
 *        required: true
 *        type: "string"
 *        maxLength: "30"
 *        default: "São Paulo"
 *      state:
 *        description: "Shipper state address"
 *        required: true
 *        type: "string"
 *        minLength: "2"
 *        maxLength: "2"
 *        default: "PR"
 *        enum:
 *          - "AC"
 *          - "AL"
 *          - "AM"
 *          - "AP"
 *          - "BA"
 *          - "CE"
 *          - "DF"
 *          - "ES"
 *          - "GO"
 *          - "MA"
 *          - "MG"
 *          - "MS"
 *          - "MT"
 *          - "PA"
 *          - "PB"
 *          - "PE"
 *          - "PI"
 *          - "PR"
 *          - "RJ"
 *          - "RN"
 *          - "RO"
 *          - "RR"
 *          - "RS"
 *          - "SC"
 *          - "SE"
 *          - "SP"
 *          - "TO"
 *  PLPShipment:
 *    type: "object"
 *    properties:
 *      trackingNumber:
 *        description: "Shipping label tracking number (etiqueta)"
 *        required: true
 *        type: "string"
 *        maxLength: "13"
 *        default: "SI733258825BR"
 *      zipCode:
 *        description: "Shipment destination zip code"
 *        required: true
 *        type: "string"
 *        maxLength: "20"
 *        default: "30170010"
 *        pattern: '^\\d+$'
 *      weight:
 *        description: "Shipment total weight"
 *        required: true
 *        type: "string"
 *        maxLength: "9"
 *        default: "0.500"
 *        pattern: '^[\\d\\.]+$'
 *      additionalServices:
 *        description: "Shipment list of additional services"
 *        type: "array"
 *        items:
 *          $ref: "#/definitions/PLPShipmentadditionalService"
 *      invoiceNumber:
 *        description: "Shipment invoice number issued for the destination"
 *        type: "string"
 *        maxLength: "8"
 *        default: null
 *        pattern: '^\\d+$'
 *      receiverName:
 *        description: "Shipment destination company/individual name"
 *        required: true
 *        type: "string"
 *        maxLength: "50"
 *        default: "Google Denmark"
 *  PLPShipmentadditionalService:
 *    type: "object"
 *    properties:
 *      code:
 *        description: "additional service code (aviso de recebimento, mão própria, valor declarado ou registro)"
 *        required: true
 *        type: "string"
 *        minLength: "3"
 *        maxLength: "3"
 *        pattern: '^\\d+$'
 *        default: "064"
 *        enum:
 *          - "001"
 *          - "002"
 *          - "019"
 *          - "064"
 *          - "025"
 *      value:
 *        description: "additional service amount value"
 *        type: "string"
 *        maxLength: "9"
 *        default: "75.9"
 *        pattern: '^[\\d\\.]+$'
 */
router.post(config.endpoints.plp, controllers.security.validateToken, controllers.plp.generatePLPPDF)
router.get(config.endpoints.plp, controllers.root.notImplementedError)
router.put(config.endpoints.plp, controllers.root.notImplementedError)
router.delete(config.endpoints.plp, controllers.root.notImplementedError)

module.exports = router
