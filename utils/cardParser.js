const fs = require('fs')

const { BlackCard, WhiteCard } = require('../models/cards')

const blackCards = []
const whiteCards = []

const parseCards = () => {
    let raw = []

    raw = fs.readFileSync('./resources/white.txt').toString().split("\n")

    for (let data of raw) {
        if (data.length > 4) {
            let whiteCard = new WhiteCard(whiteCards.length + 1, data, null)
            whiteCards.push(whiteCard)
        }
    }

    raw = fs.readFileSync('./resources/black.txt').toString().split("\n")
    for (let data of raw) {
        let blackCard = new BlackCard(blackCards.length + 1, data)
        blackCards.push(blackCard)
    }

    return {whiteCards, blackCards}
}

module.exports.parseCards = parseCards