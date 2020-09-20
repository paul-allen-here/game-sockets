import React from 'react'
import { connect } from 'react-redux'
import { pickWinner } from '../redux/actions'

const GuessCards = ({ choosedCard, leading, winner, guessCards, pickWinner }) => {

    const setWinnerColor = (owner, winner) => {
        let style = owner === winner ? {backgroundColor: 'green'} : null
        return style
    }

    const handleCardClick = (id) => {
        if (leading && !choosedCard) {
            console.log(choosedCard)
            pickWinner(id)
        }
    }
      
    return (
        <ul id = 'guess-cards'>
            {guessCards.map(card => (
                <li 
                    style = {setWinnerColor(card.id, winner)}
                    onClick = {() => handleCardClick(card.id)}
                    key={ card.id } 
                    id={ card.id }>
                    { card.text }
                </li>
            ))}
        </ul>
    )
}

const mapStateToProps = state => {
	return {
        choosedCard: state.choosedCard,
        leading: state.leading,
        winner: state.winner,
		guessCards: state.guessCards
	}
}

const mapDispatchToProps = dispatch => {
	return {
		pickWinner: data => dispatch(pickWinner(data))
	}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(GuessCards)