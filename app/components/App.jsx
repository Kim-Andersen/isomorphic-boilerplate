import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

let App = React.createClass({

	getInitialState(){
		return {
			msg: null
		}
	},

	componentDidMount(){
		this.setState({
			msg: 'React on the client took over successfully.'
		})
	},

  render() {
    return (
    	<div>
      	<h1>Welcome to the App!</h1>
      	<p>{this.state.msg}</p>
      </div>
    )
  }
})

function select(state){
  return state;
}

export default connect(select)(App)