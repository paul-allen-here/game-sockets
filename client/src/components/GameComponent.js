import React from 'react'
import { connect } from 'react-redux'
import PlayerTable from '../containers/PlayerTable'
import BlackCard from '../containers/BlackCard'
import UserHand from './UserHand'
import GuessCards from './GuessCards'

const GameComponent = props => {
	const { 
		name,
		winner,
		blackCard,
		guessCards,
		playersInfo 
	} = props

	return (
		<div>
			<PlayerTable 
				winner = { winner } 
				userName = { name } 
				playersInfo = { playersInfo } 
			/>
			<BlackCard blackCard = { blackCard }/>
			<GuessCards hand = { guessCards }/>
			<UserHand />
			{/* { BufferForMyCards } */}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		name: state.name,
		room: state.room,
		leading: state.leading,
		winner: state.winner,
		blackCard: state.blackCard,
		whiteCards: state.whiteCards,
		guessCards: state.guessCards,
		playersInfo: state.playersInfo
	}
}

export default connect(mapStateToProps, null)(GameComponent)