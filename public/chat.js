const btn = document.querySelector('#btn')
const name = document.querySelector('#name')
const room = document.querySelector('#room')
const chatroom = document.querySelector('#chatroom')
const description = document.querySelector('#description')

const form = document.querySelector('#form-container')

const gameWrap = document.querySelector('#game-wrap')
const playersInfo = document.querySelector('#players-info')

const mainCard = document.querySelector('#black-card')
const myCards = document.querySelector('#my-cards')
const guessCards = document.querySelector('#guess-cards')
const spinner = document.querySelector('.lds-facebook')

const showOnly = (whatToShow) => {
    switch (whatToShow) {
        case 'game':
            description.classList.remove("invisible")
            gameWrap.classList.remove("invisible")
            mainCard.classList.remove("invisible")
            form.classList.add("invisible")
            spinner.style.display = 'none'
            break
        case 'form':
            description.classList.remove("invisible")
            gameWrap.classList.add("invisible")
            mainCard.classList.add("invisible")
            form.classList.remove("invisible")
            spinner.style.display = 'none'
            break
        case 'loading':
            description.classList.remove("invisible")
            gameWrap.classList.add("invisible")
            mainCard.classList.add("invisible")
            form.classList.add("invisible")
            spinner.style.display = 'inline-block'
            break
        default:
            break
    }
}

let socket = io.connect()

let state = {
    name: null,
    mainCard: null,
    leading: false,
    choosedCard: false,
    score: null,
    
    guessCards: [],
    clientCards: []
}

showOnly('form')

btn.addEventListener('click', () => {
    if (name.value.length > 3) {
        socket.emit('setName', { 
            name: name.value,
            // room: room.value 
        })
        name.value = ''
    }
})

myCards.addEventListener('click', (e) => {
    if (state.choosedCard || state.leading) { 
        return
    }
    // if (state.choosedCard) { return }
    console.log(state.choosedCard)
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
    console.log("Winner picked!")
    if (state.leading) {
        let user = e.target.id
        console.log(e.target.text)
        socket.emit('winnerPicked', user)
    }
})

socket.on('askOtherName', (msg) => {
    showOnly('form')
    description.textContent = ""
    description.append(msg)
})

socket.on('startRound', (data) => {
    console.log("start!")
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
    
    state.leading = false
    state.leading = data.leading
    
    drawCards(myCards, state.clientCards)
    if (state.name) {
        let h5 = document.createElement("h5")
        h5.append(`${state.name}`)
        description.appendChild(h5)
    }
    for (let player of data.otherPlayersInfo) {
        let trInfo = document.createElement("tr")

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
    console.log(playersInfo)
})

socket.on('addGuessCard', (card) => {
    state.guessCards.push(card)
    drawCards(guessCards, state.guessCards)
    console.log(card)
})

socket.on('endRound', (data) => {
    let winner = document.createElement("h5")
    winner.append(`Выиграл(a): ${data.winner}!`)
    winner.id = "winner"
    description.append(winner)
    spinner.style.display = 'inline-block'
})

socket.on('waitRound', (msg) => {
    showOnly('loading')
    description.textContent = ""
    description.append(msg)
})

socket.on('count', (counter) => {
   // console.log(counter)
})

const drawCards = (elem, cards) => {
    elem.textContent = ""

    for (let card of cards) {
        console.log(card.text)
        let li = document.createElement("li")
        li.id = `${ card.id }`
        li.append(card.text)
        elem.append(li)
    }
}