let initialState = {
    room: null,
    name: null,
    winner: null,
    blackCard: null,
    awaitMessage: null,
    leading: false,
    choosedCard: false,

    playersInfo: [],
    guessCards: [],
    clientCards: []
}

const reducer = (state = initialState, {type, payload} = {}) => {
    switch (type) {
        
        case 'FILL_GAMEBOARD':
            return {
                ...state,
                name: payload.username,
                room: payload.room,
                leading: payload.leading,
                blackCard: payload.blackCard,
                whiteCards: payload.whiteCards,
                choosedCard: false,
                awaitMessage: null,
                winner: null,
                guessCards: [],
                playersInfo: payload.otherPlayersInfo
            }
        break

        case 'WAIT_FOR_GAME':
            return {
                ...state,
                awaitMessage: payload.awaitMessage,
                room: payload.room,
            }
        break

        case 'DELETE_CHOOSEN_CARD':
            let choosenCard = payload
            const newHand = state.whiteCards.filter((card) => (card.id !== choosenCard.id))
            return {
                ...state,
                whiteCards: newHand
            }
        break

        case 'ADD_GUESS_CARD':
            return {
                ...state,
                guessCards: [...state.guessCards, payload]
            }
        break

        case 'SET_CHOOSEN_CARD':
            return {
                ...state,
                choosedCard: true
            }
        break

        case 'SHOW_WINNER':
            return {
                ...state,
                winner: payload.winner,
                choosedCard: true
            }
        break

        default:
            return state
    }
}
  
export default reducer