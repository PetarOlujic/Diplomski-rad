import React, { Component } from 'react'
import classes from './ProjectWhiteboard.module.css'

import firebase from '../../firebase'
import WhiteboardLinks from './WhiteboardLinks/WhiteboardLinks'

class ProjectWhiteboard extends Component {
	state = {
		isLoading: true,
		documents: [
			{
				id: 0,
				value: {
					title: null,
					description: null,
					projectOwnerEmail: null,
					collaborators: [{ value: null }],
				},
			},
		],
	}

	componentDidMount = () => {
		this.setState({ isLoading: false })
		const db = firebase.firestore()
		db.collection('projects')
			.get()
			.then((querySnapshot) => {
				let arr = []
				querySnapshot.docs.map((doc) => arr.push({ id: doc.id, value: doc.data() }))

				this.setState({ documents: arr })
			})
	}

	counter = 0

	render() {
		const currentUserEmail = firebase.auth().currentUser.email
		const data = { ...this.state.documents }

		let menu = (
			<>
				<h2 style={{ textAlign: 'center', paddingRight: '5%', marginTop: '2%' }}>
					Go to project whiteboard:
				</h2>
				<div className={classes.Menu}>
					{Array(this.state.documents.length)
						.fill()
						.map((element, index) => {
							let collabs = data[index].value.collaborators.map((collab) => {
								return collab.value
							})
							// console.log(collabs)
							// console.log(currentUserEmail)
							// console.log(data[index].value.projectOwnerEmail)

							if (
								currentUserEmail === data[index].value.projectOwnerEmail ||
								collabs.includes(currentUserEmail)
							) {
								this.counter++
								return (
									<WhiteboardLinks
										key={data[index].id}
										title={data[index].value.title}
										description={data[index].value.description}
										id={data[index].id}
										isVisible
									/>
								)
							} else return null
						})}
					{this.counter ? null : <h1>There are no projects currently avalaible!</h1>}
				</div>
			</>
		)

		return <div>{menu}</div>
	}
}

export default ProjectWhiteboard
