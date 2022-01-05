const { BlackCard, WhiteCard } = require('../models/cards')
const blackCardsRaw = require('../resources/black.json');
const whiteCardsRaw = require('../resources/white.json');

const parseCards = () => {
    const whiteCards = whiteCardsRaw.whiteCards.map((rawCard, index) => new WhiteCard(index + 1, rawCard, null))

    const blackCards = blackCardsRaw.blackCards.map((rawCard, index) => new BlackCard(index + 1, rawCard))
    console.log(blackCards, whiteCards);
    return {whiteCards, blackCards}
}

module.exports.parseCards = parseCards