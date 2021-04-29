class Sender {
    constructor({
        contractNumber, board, administrativeCode, name,
        addressStreet, addressNumber, addressComplement,
        addressNeighborhood, zipCode, city, state,
        phoneNumber, fax, email, ssn, sms
    } = {}) {
        this.contractNumber = contractNumber
        this.board = board
        this.administrativeCode = administrativeCode
        this.name = name
        this.addressStreet = addressStreet
        this.addressNumber = addressNumber
        this.addressComplement = addressComplement
        this.addressNeighborhood = addressNeighborhood
        this.zipCode = zipCode
        this.city = city
        this.state = state
        this.phoneNumber = phoneNumber
        this.fax = fax
        this.email = email
        this.ssn = ssn
        this.sms = sms
    }
}
