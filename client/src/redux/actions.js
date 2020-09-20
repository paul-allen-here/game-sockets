// actionCreators

export const start = () => {
    return {
        type: "CONNECT"
    }
}

export const disconnect = () => {
    return {
        type: "DISCONNECT"
    }
}

export const join = data => {
    return {
        type: "JOIN",
        payload: data
    }
}

export const choose = data => {
    return {
        type: 'CHOOSE',
        payload: data
    }
}

export const pickWinner = data => {
    return {
        type: "WINNER_PICKED",
        payload: data
    }
}