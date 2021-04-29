class AccessData {
    constructor({
        administrativeCode, user, password, correiosUserId,
        correiosPasswordId, postalCard, cnpj, contractNumber,
        contractYear, board
    } = {}) {
        this.administrativeCode = administrativeCode
        this.user = user
        this.password = password
        this.correiosUserId = correiosUserId
        this.correiosPasswordId = correiosPasswordId
        this.postalCard = postalCard
        this.cnpj = cnpj
        this.contractNumber = contractNumber
        this.contractYear = contractYear
        this.board = board
    }
}
