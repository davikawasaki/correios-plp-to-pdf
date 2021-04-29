class Label {
    constructor({
        codeWithDv, codeWithoutDv, dv
    } = {}) {
        this.codeWithDv = codeWithDv
        this.codeWithoutDv = codeWithoutDv.replace(' ', '')
        this.dv = dv
    }

    get dv() {
        if (!this.dv) {
            const number = this.codeWithoutDv.substr(2, 8)
            const ponderationFactors = [8,6,4,2,3,5,9,7]
            const module = ponderationFactors.reduce((acc, val, i) => {
                acc += (number[i] * val)
            }, 0) % 11
            
            if (!module) this.dv = 5
            else {
                if (module === 1) this.dv = 0
                else this.dv = 11 - module
            }
        }

        return this.dv
    }

    get codeWithoutDv() {
        if (!this.codeWithoutDv) {
            this.codeWithoutDv = `${this.codeWithoutDv.substr(0, 10)}${this.codeWithoutDv.substr(10)}`
        }

        return this.codeWithoutDv
    }

    get codeWithDv() {
        if (!this.codeWithDv) {
            if (!this.codeWithoutDv) return null

            this.codeWithDv = `${this.codeWithoutDv.substr(0, 10)}${this.dv}${this.codeWithoutDv.substr(10)}`
        }

        return this.codeWithDv
    }
}
