const express = require("express")
const app = express()

const { Game } = require('./game')
const { parseCards } = require('./cardParser')

const cardsForGame = parseCards()

let tempWhiteCards = [...cardsForGame.whiteCards]
let tempBlackCards = [...cardsForGame.blackCards]

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const PORT = process.env.PORT || 5000
server = app.listen(PORT, () => {
    console.log("Server is up... on " + PORT)
})

const io = require('socket.io')(server)

let game = new Game(io, tempBlackCards, tempWhiteCards)

//  socket.join('game 237', () => {
//      let games = Object.keys(socket.games);
//      io.to(socket.id).emit("wait", stateOfgame.sockets)
//      console.log(games); // [ <socket.id>, 'game 237' ]
//  });    

io.on('connection', socket => {
    console.log(`New user with id: ${socket.id} connected`)

    socket.on('setName', data => {
        game.setNewPlayer(socket, data)
    })

    socket.on('choose', (choosenCard) => {
        game.chooseCard(socket.id, choosenCard)
    })

    socket.on('winnerPicked', (winner) => {
        game.endRound(winner)
        setTimeout(() => {
            game.startNewRound()
        }, 2300)
    })

    socket.on('disconnect', () => {
        
        if (game && game.sockets) {
            if (Array.isArray(socket.whiteCards) === true) {
                game.whiteCards = [...game.whiteCards, ...socket.whiteCards]
            }
            game.sockets = game.sockets.filter((connection) => {
                if (connection.id !== socket.id) {
                    return connection
                }
            })
            if (game.sockets.length < 2) {
                game.showWaittingMessage()
            }
        }
    })
})

// tempWhiteCards = tempWhiteCards.filter((card) => {
//     for (let tempCard of razdacha) {
//         if (card.id != tempCard.id) {
//             return(card)
//         }
//     }
// })

// tempBlackCards = tempBlackCards.filter((card) => {
//     if (card.id != blackCard.id) {
//         return(card)
//     }
// })