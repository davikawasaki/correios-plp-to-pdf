class Receiver {
    constructor({
        name, phoneNumber, mobileNumber, email,
        addressStreet, addressNumber, addressComplement,
        addressNeighborhood, reference, city, state,
        zipCode, ddd = null, isClickAndPick = false
    } = {}) {
        this.name = name
        this.phoneNumber = phoneNumber
        this.mobileNumber = mobileNumber
        this.email = email
        this.addressStreet = addressStreet
        this.addressNumber = addressNumber
        this.addressComplement = addressComplement
        this.addressNeighborhood = addressNeighborhood
        this.reference = reference
        this.city = city
        this.state = state
        this.zipCode = zipCode
        this.ddd = ddd
        this.isClickAndPick = isClickAndPick
    }
}
