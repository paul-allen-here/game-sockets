import React from 'react'
import { connect } from 'react-redux'
import { choose } from '../redux/actions'

const UserHand = ({ choosedCard, leading, hand, choose }) => {
    const coverIfLead = leading => {
        if (leading) {
            return (<div id="cover-cards"><h1>ВЫ ВЕДУЩИЙ!</h1></div>)
        } else {
            return null
        }
    }

    const handleCardClick = (card) => {
        if (!leading && !choosedCard) {
            choose(card)
        }
    }

    return (
        <div id="stiky-container">
            <div id='cards-container'>
                { coverIfLead(leading) }
                <ul id="my-cards">
                    {hand.map(card => (
                        <li 
                            onClick={() => handleCardClick(card)}
                            key={ card.id } 
                            id={ card.id }>
                            { card.text }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
	return {
        choosedCard: state.choosedCard,
		leading: state.leading,
		hand: state.whiteCards
	}
}

const mapDispatchToProps = dispatch => {
	return {
		choose: data => dispatch(choose(data))
	}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserHand)
