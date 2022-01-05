import React, { useState } from 'react'
import { connect } from 'react-redux'

const Home = ({ room }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
		navigator.clipboard.writeText(`${window.location.origin}/?room=${room}`)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
	}

  return (
    <div className='home'>
      <h1>Angry cards</h1>
      {room && <span className="link" onClick={handleCopyLink}> {copied ? "Скопирована" : "Ссылка на комнату"}</span>}
    </div>
  )
}

const mapStateToProps = state => {
	return {
		room: state.room
	}
}

export default connect(mapStateToProps, null)(Home)
