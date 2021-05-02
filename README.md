# Correios PLP to PDF stream

PoC to write a PLP to PDF stream using NodeJS 14+.

## Running locally

```bash
npm i
npm start
```

Access `localhost:8081/docs` to access swagger and test the PLP request. Make sure you click in the **Authorize** button and add the following token to test (generated using `jsonwebtoken` library via the `jwt.sign` method):

`eyJhbGciOiJIUzI1NiJ9.NjcwNmUxNjAtMmIzZi00ZGRkLTkwNTktMDhlZjFlYWUxOTJh.POLvSQbpwpuwkvOXBRi1LeQQOkSYEkpPogwOLl7AU5E`

## Considerations

1. We're using KoaJS to enable the routes for testing, but you can use Express or whatever backend NodeJS framework for such purpose. Logging is being handled by [Bunyan](https://www.npmjs.com/package/bunyan).

2. Swagger and schema docs are totally separated. In case you modify something on the schema docs, make sure you change that as well on Swagger, otherwise the docs and the schemas will be out-of-sync.

3. For validation purposes, we're using [`Ajv`](https://www.npmjs.com/package/ajv) altogether with [`schema-json`](https://json-schema.org/). Make sure you access their docs or the code in here to understand how it works.

4. For hierarchical configuration, we're using [`config`](https://www.npmjs.com/package/config). We still need to generate the environment variables from them, so that we can customize them at OS level (not only at the app level, but one can just create a `dev.js` file and call the `npm start` with a `NODE_ENV=dev` environment variable).

5. For authentication simplicity, we didn't implement a `signin` path and made one token for test based on the `config.jwt` object declarated at the `config/` folder. Therefore, one must use the token declared above to test the available endpoints.

6. For PDF generation, we're declaring the document using [`EJS`](https://ejs.co/) with HTML and [`puppeteer`](https://www.npmjs.com/package/puppeteer) to generate the PDF using Chrome/Chromium over the [DevTools protocol](https://chromedevtools.github.io/devtools-protocol/) (headless browser).

7. Generation was based on the [PHP Sigep repository tool](https://github.com/stavarengo/php-sigep) that generates not only posting pre-lists (aka PLPs) but also shipping labels (aka Etiquetas). There is still ground to cover, such as generating PDF shipping labels on NodeJS and HTML templates (TBD).

8. Testing, linting and any transpilation is pending. Feel free to contribute adding some Jest fixtures for this repo :)

9. Templating isn't really the best yet, there are some improvements to be made. Open for suggestions.
