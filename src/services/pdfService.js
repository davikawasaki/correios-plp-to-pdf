'use strict'

const ejs = require('ejs')
const puppeteer = require('puppeteer')
const path = require('path')
const logger = require('../logging')

const generatePLP = async ({ plp }) => {
    try {
        const data = await ejs.renderFile(path.join(__dirname, '../templates/', "plp.ejs"), plp)
        const browser = await puppeteer.launch({ignoreHTTPSErrors: true, args: ['--no-sandbox', '--disable-setuid-sandbox']})
    
        const page = await browser.newPage()
        await page.setContent(data, { waitUntil: 'networkidle0' })

        const pdfBuffer = await page.pdf({
            // path: './example.pdf',
            format: 'A4',
            scale: .75,
            printBackground: true
        })

        await page.close()
        await browser.close()
        
        logger.info(`PLP generated as PDF buffer for code number ${plp.code}.`)

        return pdfBuffer
    } catch (e) {
        logger.error(e)
        return null
    }
}

module.exports = {
    generatePLP
}
