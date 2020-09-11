const btn = document.querySelector('#btn')
const name = document.querySelector('#name')
const room = document.querySelector('#room')
const chatroom = document.querySelector('#chatroom')
const description = document.querySelector('#description')

const form = document.querySelector('#form-container')

const gameWrap = document.querySelector('#game-wrap')
const playersInfo = document.querySelector('#players-info')

const mainCard = document.querySelector('#black-card')

const cardsCover = document.querySelector(`#cover-cards`)

const myCards = document.querySelector('#my-cards')
const guessCards = document.querySelector('#guess-cards')

const showOnly = (whatToShow) => {
    switch (whatToShow) {
        case 'game':
            description.classList.remove("invisible")
            gameWrap.classList.remove("invisible")
            mainCard.classList.remove("invisible")
            form.classList.add("invisible")
            break
        case 'form':
            description.classList.remove("invisible")
            gameWrap.classList.add("invisible")
            mainCard.classList.add("invisible")
            form.classList.remove("invisible")
            break
        case 'loading':
            description.classList.remove("invisible")
            gameWrap.classList.add("invisible")
            mainCard.classList.add("invisible")
            form.classList.add("invisible")
            break
        default:
            break
    }
}

// let counter = 0;
// setInterval(() => {
//     socket.emit('count', ++counter);
// }, 1000);

showOnly('form')

let socket = io.connect()

let state = {
    name: null,
    mainCard: null,
    leading: false,
    choosedCard: false,
    score: null,

    playersInfo: [],
    guessCards: [],
    clientCards: []
}

btn.addEventListener('click', () => {
    if (name.value.length > 3 && room.value.length > 3) {
        socket.emit('setName', { 
            name: name.value.replace(/ /g,""),
            room: room.value 
        })
        name.value = ''
        room.value = ''
    }
})

myCards.addEventListener('click', (e) => {
    if (state.choosedCard || state.leading) { 
        return
    }

    if (!Number(e.target.id)) {
        return
    }

    let id = e.target.id

    let choosenCard = state.clientCards.filter((card) => {
        if (card.id == id) { return card }
    })[0]

    state.clientCards = state.clientCards.filter((card) => {
        if (card.id != id) { return card }
    })
    state.choosedCard = true
    drawCards(myCards, state.clientCards)
    socket.emit('choose', choosenCard)
})

guessCards.addEventListener('click', (e) => {
    if (state.leading) {
        let user = e.target.id
        if (!state.playersInfo.find(player => player.player === user)) {
            return
        }
        socket.emit('winnerPicked', user)
    }
})

socket.on('askOtherName', (msg) => {
    showOnly('form')
    description.textContent = ""
    description.append(msg)
})

socket.on('startRound', (data) => {
    mainCard.textContent = ""
    guessCards.textContent = ""
    description.textContent = ""
    playersInfo.textContent = ""
    showOnly('game')
    mainCard.append(data.blackCard.text)

    state.name = data.username
    state.choosedCard = false
    state.guessCards = []
    state.clientCards = data.whiteCards
    state.playersInfo = data.otherPlayersInfo

    state.leading = false
    state.leading = data.leading

    cardsCover.style.display = state.leading ? "block" : "none"
    
    drawCards(myCards, state.clientCards)
    for (let player of data.otherPlayersInfo) {
        let trInfo = document.createElement("tr")
        trInfo.id = `${player.player}-row`
        if (player.player === state.name) {
            trInfo.style.background = 'rgb(20, 20, 20)'
            trInfo.style.color = 'rgb(236, 230, 230)'
        }
        let tdName = document.createElement("td")
        let tdScore = document.createElement("td")
        let tdLead = document.createElement("td")

        tdName.append(`${player.player}`)
        tdScore.append(`${player.score}`)

        if (player.lead === true) {
            tdLead.append(`Ведущий`)
        } else {
            tdLead.append(``)
        }
        
        trInfo.appendChild(tdName)
        trInfo.appendChild(tdScore)
        trInfo.appendChild(tdLead)
        playersInfo.appendChild(trInfo)
    }
})

socket.on('addGuessCard', (card) => {
    state.guessCards.push(card)
    drawCards(guessCards, state.guessCards)
})

socket.on('endRound', (data) => {
    let winnerCard = document.querySelector(`#${data.winner}`)
    let winnerRow = document.querySelector(`#${data.winner}-row`)
    winnerRow.style.background = 'green';
    winnerCard.style.background = 'green';
    console.log(data.winner, winnerCard)
})

socket.on('waitRound', (msg) => {
    showOnly('loading')
    description.textContent = ""
    description.append(msg)
})

const drawCards = (elem, cards) => {
    elem.textContent = ""

    for (let card of cards) {
        let li = document.createElement("li")

        li.id = `${ card.id }`
        li.append(card.text)
        elem.append(li)
    }
}