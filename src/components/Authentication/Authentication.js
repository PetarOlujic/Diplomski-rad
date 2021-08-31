import React, { useState, useEffect } from 'react'
import './Authentication.css'

import { auth, authUI } from '../../firebase'
import firebase from 'firebase/app'
import Layout from '../Layout/Layout'

async function authenticateUser(email, password, isLogin) {
	try {
		isLogin
			? await auth.signInWithEmailAndPassword(email, password)
			: await auth.createUserWithEmailAndPassword(email, password)
	} catch (err) {
		console.log(err)
	}
}

const authenticateUserWithEnter = (e, email, password, isLogin) => {
	if (e.key === 'Enter') {
		authenticateUser(email, password, isLogin)
	}
}

const renderLoggedIn = () => {
	// return isLoading ? <Spinner /> : <Layout logOut={() => auth.signOut()} />
	return <Layout logOut={() => auth.signOut()} />
}

const Authentication = (props) => {
	const [isLogin, setIsLogin] = useState(true)
	const [user, setUser] = useState(null)

	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')

	const [signupEmail, setSignupEmail] = useState('')
	const [signupPassword, setSignupPassword] = useState('')

	// pokusaj dodavanja spinnera
	// const [isLoading, setIsLoading] = useState(true)

	// useEffect(() => {
	// 	setIsLoading(false)
	// })

	auth.onAuthStateChanged((user) => {
		setUser(user)
	})

	useEffect(() => {
		if (!user) {
			authUI.start('.google-login', {
				signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
			})
		}
	}, [user])

	return (
		<>
			{user ? (
				renderLoggedIn()
			) : (
				<div className='auth-form-wrapper'>
					<div className='auth-form-card'>
						<div>
							<>
								<div className='auth-form-header'>
									Collaborative App Authenticaton
								</div>
								<div className='auth-form-login-signup'>
									<button className='buttons' onClick={() => setIsLogin(true)}>
										Login
									</button>
									<button className='buttons' onClick={() => setIsLogin(false)}>
										Sign up
									</button>
								</div>
								{isLogin ? (
									<>
										<div>
											<div className='auth-form-fields'>
												<label className='form-labels'>Email</label>
												<input
													className='input-fields'
													placeholder='Email Address'
													name='loginEmail'
													type='email'
													value={loginEmail}
													onChange={(e) => setLoginEmail(e.target.value)}
												></input>
											</div>
											<div className='auth-form-fields'>
												<label className='form-labels'>Password</label>
												<input
													className='input-fields'
													placeholder='Password'
													name='loginPassword'
													type='password'
													value={loginPassword}
													onChange={(e) =>
														setLoginPassword(e.target.value)
													}
													onKeyPress={(e) =>
														authenticateUserWithEnter(
															e,
															loginEmail,
															loginPassword,
															true
														)
													}
												></input>
											</div>
											<button
												onClick={() =>
													authenticateUser(
														loginEmail,
														loginPassword,
														true
													).then()
												}
												className='auth-form-buttons'
												style={{
													backgroundColor: '#21ba45',
												}}
											>
												Login
											</button>
										</div>
										<div className='google-login'></div>
									</>
								) : (
									<>
										<div>
											<div className='auth-form-fields'>
												<label className='form-labels'>Email</label>
												<input
													className='input-fields'
													placeholder='Email Address'
													name='signUpEmail'
													type='email'
													value={signupEmail || ''}
													onChange={(e) => setSignupEmail(e.target.value)}
												></input>
											</div>
											<div className='auth-form-fields'>
												<label className='form-labels'>Password</label>
												<input
													className='input-fields'
													placeholder='Password'
													name='signUpPassword'
													type='password'
													value={signupPassword || ''}
													onChange={(e) =>
														setSignupPassword(e.target.value)
													}
												></input>
											</div>
											<button
												className='auth-form-buttons'
												style={{
													backgroundColor: '#00b5ad',
												}}
												onClick={() =>
													authenticateUser(
														signupEmail,
														signupPassword,
														false
													)
												}
											>
												Sign up
											</button>
										</div>
										<div className='google-login'></div>
									</>
								)}
							</>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Authentication
