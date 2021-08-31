import React, { Component } from 'react'

import Navigation from '../Navigation/Navigation'

class Layout extends Component {
	render() {
		return (
			<>
				<Navigation logout={this.props.logOut} />
			</>
		)
	}
}

export default Layout
