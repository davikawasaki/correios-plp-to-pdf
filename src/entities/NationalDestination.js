class Destination {
    constructor({
        addressNeighborhood, zipCode, city, state,
        orderNumber, invoiceNumber = null, agency,
        invoiceSeries = null, invoiceValue = null,
        invoiceType = null, description = null,
        chargeableValue = null
    } = {}) {
        this.addressNeighborhood = addressNeighborhood
        this.zipCode = zipCode
        this.city = city
        this.state = state
        this.orderNumber = orderNumber
        this.invoiceNumber = invoiceNumber
        this.agency = agency
        this.invoiceSeries = invoiceSeries
        this.invoiceValue = invoiceValue
        this.invoiceType = invoiceType
        this.description = description
        this.chargeableValue = chargeableValue
    }
}
