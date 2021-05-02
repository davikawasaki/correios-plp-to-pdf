'use strict'

class AdditionalService {
    constructor({
        code, declaredValue
    } = {}) {
        this.code = code
        this.declaredValue = declaredValue
    }

    static SERVICE_AVISO_DE_RECEBIMENTO = "001"
    static SERVICE_MAO_PROPRIA = "002"
    static SERVICE_VALOR_DECLARADO_SEDEX = "019"
    static SERVICE_VALOR_DECLARADO_PAC = "064"
    static SERVICE_REGISTRO = "025"
    static SERVICE_VALOR_DECLARADO = this.SERVICE_VALOR_DECLARADO_SEDEX
}

module.exports = AdditionalService
