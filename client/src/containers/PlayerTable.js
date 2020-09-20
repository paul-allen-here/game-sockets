import React from 'react'

const PlayerTable = ({ winner, userName, playersInfo }) => {

    const isLead = (lead) => (lead ? 'Ведущий' : '')

    const rowStyle = (name, winner, userName) => {
        let className = ''
        if (name === winner) {
            className = 'winner-row'
        } else if (name === userName) {
            className = 'user-row'
        }
        return className
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Игрок</th>
                    <th>Очки</th>
                    <th>Ведущий</th>
                </tr>
            </thead>
            <tbody>
                {playersInfo.map((player, index) => (
                    <tr key={ index } className={
                        rowStyle(
                            player.player,
                            winner, 
                            userName
                        )
                    }>  
                        <td>{player.player}</td>
                        <td>{player.score}</td>
                        <td>{isLead(player.lead)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PlayerTable