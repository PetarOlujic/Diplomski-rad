import React from 'react'
import classes from './User.module.css'

import firebase from '../../firebase'
import { Redirect, BrowserRouter as Router } from 'react-router-dom'

const User = (props) => {
	return (
		<>
			<h2 style={{ textAlign: 'center', marginTop: '20px' }}>
				User that is currently logged in: {firebase.auth().currentUser.email}
			</h2>
			<div className={classes.Wrapper}>
				<button className={classes.GlowOnHover} onClick={props.logout}>
					<Router>
						<Redirect to='/' />
					</Router>
					Log out
				</button>
			</div>
		</>
	)
}

export default User
