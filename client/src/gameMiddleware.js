import io from 'socket.io-client'

const ENDPOINT = `${location.protocol}//${location.hostname}:5000`
// const ENDPOINT = 'localhost:5000'
let socket

const middleware = store => next => action => {
    switch (action.type) {
        case 'CONNECT':
            socket = process.env.NODE_ENV === 'development' ? io(ENDPOINT) : io()

            // Attach the callbacks on socket events

            socket.on('ERROR_NAME', msg => {
                console.log(msg)
            })

            socket.on('WAIT_FOR_GAME', data => {
                store.dispatch({ type: 'WAIT_FOR_GAME', payload: data })
            })

            socket.on('START_ROUND', data => {
                store.dispatch({ type: 'FILL_GAMEBOARD', payload: data })
            })

            socket.on('ADD_GUESS_CARD', data => {
                store.dispatch({ type: 'ADD_GUESS_CARD', payload: data })
            })

            socket.on('END_ROUND', data => {
                store.dispatch({ type: 'SHOW_WINNER', payload: data })
            })

            socket.on('message', message => {
                store.dispatch({ type: 'MESSAGE', payload: message })
            })
            break
        // Player joined the room
        case 'JOIN':
            socket.emit('JOIN', action.payload)
            break
        // Player choose card from hand to play
        case 'CHOOSE':
            store.dispatch({ type: 'SET_CHOOSEN_CARD' })
            socket.emit('CHOOSE', action.payload)
            store.dispatch({ type: 'DELETE_CHOOSEN_CARD', payload: action.payload })
            break
        // Judge picked winner's card
        case 'WINNER_PICKED':
            console.log(action.payload)
            store.dispatch({ type: 'SET_CHOOSEN_CARD' })
            socket.emit('WINNER_PICKED', action.payload)
            break

        // User request to disconnect
        case 'DISCONNECT':
            socket.emit('disconnect')
            socket.off()
            break

        default:
            break
    }

    return next(action)
}

export default middleware