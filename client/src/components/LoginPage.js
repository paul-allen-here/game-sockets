import React, { useState } from 'react'
import { connect } from 'react-redux'
import { join } from '../redux/actions'
import qs from 'qs'

const LoginPage = ({ join }) => {
	const queryParams = qs.parse(window.location.search, {ignoreQueryPrefix: true})
	
  	const [name, setName] = useState("")
	const [room, setRoom] = useState(queryParams.room || "")

	const handleJoinClick = () => {
		join({ 
			name: name, 
			room: room
		})
	}

  const showRoomInput = (hasRoomParam) => {
		if (hasRoomParam) {
			return null
		} else {
			return (
				<input
					id="room"
					type="text"
					value={room}
					onChange={(e) => setRoom(e.target.value.toLowerCase().replace(/ /g,""))}
					placeholder="Room to join"
				/>
			)
		}
	}

  return (
    <div id="form">
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value.replace(/ /g,""))}
        placeholder="Your name"
      />
      { showRoomInput(queryParams.room) }
      <button id="joinBtn" onClick={(e) => { handleJoinClick() }}>JOIN</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
	return {
		join: (data) => dispatch(join(data))
	}
}
  
export default connect(null, mapDispatchToProps)(LoginPage)
