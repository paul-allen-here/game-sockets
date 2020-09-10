class Game {
    constructor(io, blackCards, whiteCards) {
        this.io = io
        this.blackCards = blackCards
        this.whiteCards = whiteCards
    }
    
    currentBlackCard = null
    guessCards = null
    sockets = []
    playersToStart = 2
    leadIndex = 0
    numberOfCardsOnHand = 8

    setNewPlayer(socket, data) {
        if (this.sockets.some(socket => socket.username === data.name)) {
            this.askForOtherName(socket)
            return
        }
        console.log(`New player ${data.name}`)
        socket.username = data.name
        socket.score = 0
        this.sockets.push(socket)
        
        if (this.sockets.length >= this.playersToStart) {
            console.log("All Players setted!")
            this.startNewRound()
            // let counter = 0;
            // setInterval(() => {
            //     socket.emit('count', ++counter);
            // }, 1000);
        } else {
            this.showWaittingMessage()
        }
    }

    askForOtherName(socket) {
        socket.emit('askOtherName', `Это имя уже занято!`)
    }

    showWaittingMessage() {
        console.log("Waiting!")
        for (let socket of this.sockets) {
            socket.score = 0
            socket.emit('waitRound', `Ждем подключения еще ${this.playersToStart - this.sockets.length} игроков/ка).`)
        }
    }

    startNewRound() {
        console.log("Game Starts!")
        this.currentBlackCard = shuffleCards(this.blackCards)[0]
        for (let socket of this.sockets) {
            this.getUserStarted(socket, this.currentBlackCard)
        }
    }

    setUserHand(socket) {
        while (socket.whiteCards.length < this.numberOfCardsOnHand) {
            socket.whiteCards.push(shuffleCards(this.whiteCards).pop())
        }
    }
    
    getUserStarted(socket, blackCard) {
        console.log(this.whiteCards.length)
        if (!socket.whiteCards) {
            socket.whiteCards = []
            this.setUserHand(socket)
        } else {
            this.setUserHand(socket)
        }
        console.log(this.whiteCards.length)
        socket.whiteCards = socket.whiteCards.map(el => {
            el.owner = socket.username
            return el
        })
        let otherPlayersInfo = []
        
        for (let socket of this.sockets) {
            let isleadingPlayer = false
            isleadingPlayer = this.checkLeadingSocket(socket)
            otherPlayersInfo = [
                ...otherPlayersInfo, 
                {
                    player: socket.username,
                    score: socket.score,
                    lead: isleadingPlayer
                }
            ]
        }
        let userData = {
            otherPlayersInfo,
            username: socket.username,
            leading: this.checkLeadingSocket(socket),
            blackCard: blackCard,
            whiteCards: socket.whiteCards
        }
        this.io.to(socket.id).emit("startRound", userData)
    }

    checkLeadingSocket(socket) {
        let isLeading = this.sockets[this.leadIndex].username === socket.username ? true : false
        return isLeading
    }

    chooseCard(id, choosenCard) {
        console.log(choosenCard)
        for (let socket of this.sockets) {
            if (socket.id === id) {
                socket.whiteCards = socket.whiteCards.filter((card) => {
                    if (card.id !== choosenCard.id) {
                        return card
                    }
                })
            }
        }
        let blueCard = {...choosenCard}
        blueCard.id = choosenCard.owner
        choosenCard.owner = null
        console.log(this.whiteCards.length)
        this.whiteCards.push(choosenCard)
        if (this.currentBlackCard) {
            blueCard.text = pasteText(this.currentBlackCard.text, blueCard.text)
            this.io.emit('addGuessCard', blueCard)
        }
        console.log(this.whiteCards.length)
    }

    endRound(winner) {
        this.sockets = this.sockets.map((socket) => {
            if (winner === socket.username) {
                socket.score++
            }
            return socket
        })
        this.io.emit('endRound', { 
            winner: winner
        })
        this.leadIndex++
        if (this.sockets.length - 1 < this.leadIndex) {
            this.leadIndex = 0
        }
    }
}

const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

const pasteText = (blackCard, whiteCard) => {
    let result = blackCard.replace(/____/i, whiteCard)
    result = result.replace(/(^|[\.\?\!]\s+)(.)/g, (a, b, c) => {
        return b + c.toUpperCase();
    })
    return result
}

module.exports.Game = Game