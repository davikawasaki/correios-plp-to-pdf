'use strict'

module.exports = {
    log: {
        opts: {
            level: 'trace',
            name: 'correios-plp-to-pdf'
        }
    },
    jwt: {
        secretKey: '965fde5d-a5ef-4b70-bc3c-3c265c2933de',
        secretValue: '6706e160-2b3f-4ddd-9059-08ef1eae192a'
    },
    endpoints: {
        health: '/health',
        root: '/',
        plp: '/plp'
    },
    port: 8081
}
