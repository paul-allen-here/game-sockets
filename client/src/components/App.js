import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { start, disconnect } from '../redux/actions'

import LoginPage from "./LoginPage"
import Game from "./GameComponent"
import Home from "../containers/Home"
import Loading from "../containers/Loading"

const App = ({ name, room, awaitMessage, start, disconnect }) => {

  let loginNeeded = name && room ? false : true 

  useEffect(() => {
    start()
    return () => {
      disconnect()
    }
  }, [])

  const renderLoginPage = bool => {
    if (awaitMessage) {
      return (<Loading msg = {awaitMessage}/>) 
    }
    if (bool) {
      return (<LoginPage />)
    } else {
      return (<Game />)
    }
  }

  return (
    <div className="app">
      <Home />
      { renderLoginPage(loginNeeded) }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      name: state.name,
      room: state.room,
      awaitMessage: state.awaitMessage
  }
}

export default connect(mapStateToProps, { start, disconnect })(App)