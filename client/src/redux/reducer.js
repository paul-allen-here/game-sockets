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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case 'FILL_GAMEBOARD':
            return {
                ...state,
                name: action.payload.username,
                room: action.payload.room,
                leading: action.payload.leading,
                blackCard: action.payload.blackCard,
                whiteCards: action.payload.whiteCards,
                choosedCard: false,
                awaitMessage: null,
                winner: null,
                guessCards: [],
                playersInfo: action.payload.otherPlayersInfo
            }
        break

        case 'WAIT_FOR_GAME':
            return {
                ...state,
                awaitMessage: action.payload
            }
        break

        case 'DELETE_CHOOSEN_CARD':
            let choosenCard = action.payload
            const newHand = state.whiteCards.filter((card) => (card.id !== choosenCard.id))
            return {
                ...state,
                whiteCards: newHand
            }
        break

        case 'ADD_GUESS_CARD':
            return {
                ...state,
                guessCards: [...state.guessCards, action.payload]
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
                winner: action.payload.winner,
                choosedCard: true
            }
        break

        default:
            return state
    }
}
  
export default reducer