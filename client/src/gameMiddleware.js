import io from 'socket.io-client'

const ENDPOINT = `${location.protocol}//${location.hostname}:5000`
// const ENDPOINT = 'localhost:5000'
let socket

const middleware = store => next => action => {
    switch (action.type) {
        case 'CONNECT':
            socket = io(ENDPOINT)
            console.log(`Connected to ${ENDPOINT}`)

            socket.on('ERROR_NAME', msg => {
                console.log(msg)
            })

            // Attach the callbacks
            socket.on(ev, data => {
                store.dispatch({ type: ev, payload: data })
            })

        case 'JOIN':
            socket.emit('JOIN', action.payload)
            break
        
        case 'CHOOSE':
            store.dispatch({ type: 'SET_CHOOSEN_CARD' })
            socket.emit('CHOOSE', action.payload)
            store.dispatch({ type: 'DELETE_CHOOSEN_CARD', payload: action.payload })
            break

        case 'WINNER_PICKED':
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