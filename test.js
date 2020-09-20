const { parseCards } = require('./utils/cardParser')

const cardsForGame = parseCards()

let myCards = [...cardsForGame.blackCards]

const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]
    }
    return cards
}

console.log(myCards)

shuffleCards(myCards)