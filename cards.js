class BlackCard {
    constructor(id, text) {
        this.id = id
        this.text = text
    }
}

class WhiteCard {
    constructor(id, text, owner = null) {
        this.id = id
        this.text = text
        this.owner = owner
    }
}

module.exports.BlackCard = BlackCard
module.exports.WhiteCard = WhiteCard

