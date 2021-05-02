'use strict'

const Ajv = require('ajv')
const { plpSchema } = require('../schemas')

const validatePLPSchema = ({ payload } = {}) => {
    const validator = new Ajv()

    if (!_validateSchema({ validator, schema: plpSchema, payload })) {
        return { errors: validator.errors }
    }
    return { errors: null }
}

const _validateSchema = ({ validator, schema, payload } = {}) => {
    if (!validator.getSchema(schema.$id)) validator.compile(schema)
    return validator.validate(schema, payload)
}

module.exports = {
    validatePLPSchema
}
