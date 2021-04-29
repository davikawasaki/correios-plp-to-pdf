class Dimension {
    constructor({
        type, height, width, length, diameter
    } = {}) {
        this.type = type
        this.height = height
        this.width = width
        this.length = length
        this.diameter = diameter
    }

    static TIPO_ENVELOPE = "001"
    static TIPO_PACOTE_CAIXA = "002"
    static TIPO_ROLO_CILINDRO = "003"
}
