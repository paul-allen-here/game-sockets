const fs = require('fs')

const { BlackCard, WhiteCard } = require('./cards')

const blackCards = []
const whiteCards = []

const parseCards = () => {
    let raw = []

    raw = fs.readFileSync('white.txt').toString().split("\n")
    for (let data of raw) {
        let whiteCard = new WhiteCard(whiteCards.length, data, null)
        whiteCards.push(whiteCard)
    }

    raw = fs.readFileSync('black.txt').toString().split("\n")
    for (let data of raw) {
        let blackCard = new BlackCard(blackCards.length, data)
        blackCards.push(blackCard)
    }

    return {whiteCards, blackCards}
}

module.exports.parseCards = parseCards