import React, { Component } from 'react'
import classes from './RetrospectiveList.module.css'

import Retrospective from './Retrospective/Retrospective'
import CreateARetrospective from './CreateARetrospective/CreateARetrospective'
import Modal from '../UI/Modal/Modal'
import firebase from '../../firebase'

class RetrospectiveList extends Component {
	state = {
		adding: false,
		description: '',
		selection: 'Start',
		retrospectives: [{ description: '', selection: '' }],
		isCreated: false,
		isUpdated: false,
	}

	id = window.location.pathname.split('/')[2].toString()

	componentDidMount() {
		const db = firebase.firestore()
		db.collection('retrospectives')
			.doc(this.id)
			.get()
			.then((querySnapshot) => {
				let arr = []
				if (querySnapshot.exists) {
					// console.log(querySnapshot.data())
					// querySnapshot.data().map(
					// 	(doc) => arr.push(doc.data())
					// )
					arr = querySnapshot.data()
					// console.log(arr)
				} else {
					console.log('Nema postojeceg dokumenta')
				}

				this.setState({ retrospectives: arr })
				console.log(this.state.retrospectives)
			})
	}

	// db = firebase.firestore().collection('projects').doc(this.id)
	db = firebase.firestore().collection('retrospectives').doc(this.id)

	updateInput = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		})
	}

	addingHandlerModal = () => {
		this.setState({ adding: false })
	}

	addingHandlerNewRetrospective = () => {
		this.setState({ adding: true })
	}

	addRetrospective = (e) => {
		e.preventDefault()
		let data = this.state.retrospectives
		console.log(data)
		if (data.length === 0) {
			this.db
				.set({
					retrospective: [
						{
							description: this.state.description,
							selection: this.state.selection,
							author: firebase.auth().currentUser.email,
						},
					],
				})
				.then(this.setState({ isCreated: true }))
		} else {
			this.db
				.update({
					retrospective: firebase.firestore.FieldValue.arrayUnion(
						// ...this.state.retrospectives
						...[
							{
								description: this.state.description,
								selection: this.state.selection,
								author: firebase.auth().currentUser.email,
							},
						]
					),
				})
				.then(this.setState({ isUpdated: true }))
		}
		setTimeout(() => {
			this.setState({
				description: '',
				selection: 'Start',
			})
			window.location.reload()
		}, 1500)
	}

	render() {
		// console.log(this.id)
		// console.log(this.retrospectives)
		// const data = [...this.state.retrospectives]
		// console.log(data)

		const list = (
			<div className={classes.Container}>
				<div className={classes.Description}>
					<span className={classes.Span1}>Retrospectives</span>
					<span className={classes.Span}>Start</span>
					<span className={classes.Span}>Stop</span>
					<span className={classes.Span}>Continue</span>
				</div>
				<div className={classes.RetrospectiveContainer}>
					{this.state.retrospectives.retrospective
						? Array(this.state.retrospectives.retrospective.length)
								.fill()
								.map((element, index) => {
									// if (this.state.retrospectives.retrospective)
									// 	console.log(this.state.retrospectives.retrospective.length)
									return (
										<Retrospective
											key={Math.random()}
											description={
												this.state.retrospectives.retrospective[index]
													.description
											}
											selection={
												this.state.retrospectives.retrospective[index]
													.selection
											}
											id={this.id}
										/>
									)
								})
						: null}
				</div>
				<div
					className={classes.CreateARetrospective}
					onClick={this.addingHandlerNewRetrospective}
				>
					<CreateARetrospective />
				</div>
			</div>
		)

		const form = (
			<>
				<h2 style={{ marginLeft: '35px' }}>Add a retrospective:</h2>
				<form className={classes.Wrapper} onSubmit={this.addRetrospective}>
					<div className={classes.DescriptionDiv}>
						<label htmlFor='description'>Description:</label>
						<textarea
							rows='5'
							style={{ resize: 'none' }}
							type='text'
							id='description'
							// name='description'
							size='100'
							placeholder='Project description...'
							className={classes.InputDescription}
							onChange={this.updateInput}
							// defaultValue={this.state.description}
						/>
					</div>
					<label htmlFor='selection'>Choose one of the following:</label>
					<div className={classes.Selection}>
						<select id='selection' onChange={this.updateInput}>
							<option defaultValue value='Start'>
								Start
							</option>
							<option value='Stop'>Stop</option>
							<option value='Continue'>Continue</option>
						</select>
					</div>
					<button type='submit' className={classes.SubmitButton}>
						Submit
					</button>
				</form>
			</>
		)

		return (
			<>
				{/* {data.length ? (
					list
				) : (
					<>
						<h1>No retrospectives avalaible, make a new one!</h1>
						<CreateARetrospective />
					</>
				)} */}
				{list}
				<Modal show={this.state.adding} modalClosed={this.addingHandlerModal}>
					{form}
				</Modal>
				<Modal show={this.state.isCreated}>
					<h2>Retrospective was created!</h2>
				</Modal>
				<Modal show={this.state.isUpdated}>
					<h2>Retrospective was updated!</h2>
				</Modal>
			</>
		)
	}
}

export default RetrospectiveList
