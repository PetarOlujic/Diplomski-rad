import React, { Component } from 'react'
import classes from './CreateAProject.module.css'

import firebase from '../../firebase'
import Modal from '../UI/Modal/Modal'
import emailjs from 'emailjs-com'

const SERVICE_ID = 'service_whrcq5t'
const TEMPLATE_ID = 'template_lplbdz1'
const USER_ID = 'user_OqKNR0i5whNdhsK9cCetz'

class CreateAProject extends Component {
	state = {
		title: '',
		description: '',
		fields: [{ value: null }],
		isShowing: false,
	}

	// isShowingHandler = () => {
	// 	this.setState({ isShowing: false })
	// }

	updateInput = (e) => {
		// console.log([e.target.name])
		this.setState({
			[e.target.id]: e.target.value,
		})
	}

	handleChange = (i, event) => {
		const values = [...this.state.fields]
		values[i].value = event.target.value
		this.setState({ fields: [...values] })
	}

	handleAdd = () => {
		const values = [...this.state.fields]
		values.push({ value: null })
		this.setState({ fields: [...values] })
		// console.log(this.state.fields)
	}

	handleRemove = (i) => {
		const values = [...this.state.fields]
		values.splice(i, 1)
		this.setState({ fields: [...values] })
	}

	addUser = (e) => {
		e.preventDefault()
		const db = firebase.firestore()
		db.collection('projects')
			.add({
				title: this.state.title,
				description: this.state.description,
				projectOwnerEmail: firebase.auth().currentUser.email,
				collaborators: this.state.fields,
			})
			.then(() => {
				let fields = [...this.state.fields]
				fields.map((field) => {
					let to_name = field.value
					// console.log(to_name)
					let from_name = `${firebase.auth().currentUser.email}`
					// console.log(from_name)
					let message = this.state.title
					// console.log(message)
					// console.log(this.state)
					// console.log(this.state.title)
					let templateParams = {
						from_name: from_name,
						to_name: to_name,
						to_email: to_name,
						message: message,
					}

					// DIO ZA SLANJE MAILA
					emailjs
						.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
						.then(console.log('E-mail sent succesfully!'))
						.catch((err) => console.log('An error occured: ', err))
				})
				// alert('Submit successful!')
				this.setState({ isShowing: true })
			})
			.catch((err) => console.log(err))

		setTimeout(() => {
			this.setState({
				title: '',
				description: '',
			})
			window.location.reload()
			// this.resetForm()
		}, 1500)
	}

	render() {
		return (
			<>
				<form className={classes.Wrapper} onSubmit={this.addUser}>
					<div className={classes.TitleDiv}>
						<label htmlFor='title'>Title: </label>
						<input
							type='text'
							id='title'
							placeholder='Project title...'
							className={classes.InputTitle}
							onChange={this.updateInput}
							defaultValue={this.state.title}
						/>
					</div>
					<div className={classes.DescriptionDiv}>
						<label htmlFor='description'>Description:</label>
						<textarea
							rows='5'
							style={{ resize: 'none' }}
							type='text'
							id='description'
							size='100'
							placeholder='Project description...'
							className={classes.InputDescription}
							onChange={this.updateInput}
							defaultValue={this.state.description}
						/>
					</div>

					<div className={classes.InputForm}>
						<p style={{ marginTop: '0' }}>Add collaborators:</p>
						{this.state.fields.map((field, idx) => {
							return (
								<div className={classes.InputFormDiv} key={`${field}-${idx}`}>
									<input
										type='text'
										placeholder='Enter e-mail'
										value={field.value || ''}
										onChange={(e) => this.handleChange(idx, e)}
										style={{ padding: '3px' }}
									/>
									<button type='button' onClick={() => this.handleRemove(idx)}>
										<i class='fas fa-minus-circle' style={{ color: 'red' }}></i>
									</button>
								</div>
							)
						})}

						<button type='button' onClick={() => this.handleAdd()}>
							<i class='fas fa-plus-circle' style={{ color: 'green' }}></i>
						</button>
					</div>

					<div className={classes.ButtonContainer}>
						<button type='submit' className={classes.SubmitButton}>
							Submit
						</button>
					</div>
				</form>
				<Modal show={this.state.isShowing}>
					<h2 style={{ textAlign: 'center' }}>Submit successful!</h2>
				</Modal>
			</>
		)
	}
}

export default CreateAProject
