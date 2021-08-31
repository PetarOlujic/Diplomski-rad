import React, { Component } from 'react'
import classes from './Dropdown.module.css'

import firebase from '../../../firebase'
import Project from './Projects/Project'

class Dropdown extends Component {
	state = {
		showMenu1: false,
		showMenu2: false,
		toggleButton1: true,
		toggleButton2: true,
		// dakle, da bi moga koristit id, title i ostalo, ovdi san MORA sve ovako postavit na null, inace baca undefined pri pristupu
		// i mora san destruktirat state u data varijablu da bi moga manipulirat stateom (valjda je zato)
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
		isShowingDelete: false,
	}

	componentDidMount = () => {
		const db = firebase.firestore()
		db.collection('projects')
			.get()
			.then((querySnapshot) => {
				let arr = []
				querySnapshot.docs.map(
					(doc) => arr.push({ id: doc.id, value: doc.data() })
					// console.log(doc.id, ' => ', doc.data())
				)

				this.setState({ documents: arr })
				// console.log(this.state.documents)
			})
	}

	showMenu1Handler = (showmenu) => {
		this.setState({ showMenu1: !showmenu }, () => {
			// console.log('Show menu1')
			this.toggleButton1Handler(this.state.toggleButton1)
		})
	}

	showMenu2Handler = (showmenu) => {
		this.setState({ showMenu2: !showmenu }, () => {
			// console.log('Show menu2')
			this.toggleButton2Handler(this.state.toggleButton2)
		})
	}

	toggleButton1Handler = (togglebutton1) => {
		this.setState({ toggleButton1: !togglebutton1 })
	}

	toggleButton2Handler = (togglebutton2) => {
		this.setState({ toggleButton2: !togglebutton2 })
	}

	counter = 0

	render() {
		// problem je u tome sta kod inicijalnog rendera, niz je prazan, i onda nema property id
		// tek kad se CDM pokrene, onda se sve ucita
		// OCITO TO NIJE PROBLEM, PROBA SA CWM PA ISTA STVAR
		const data = { ...this.state.documents }
		const currentUserEmail = firebase.auth().currentUser.email

		let menu1 = this.state.showMenu1 ? (
			<div className={classes.Menu}>
				{Array(this.state.documents.length)
					.fill()
					.map((element, index) => {
						let linkIsVisible = false
						// Dio koji sam izbacia jer nema smisla da postoje linkovi pod 'all projects'
						// let collabs = data[index].value.collaborators.map((collab) => {
						// 	return collab.value
						// })

						// if (
						// 	currentUserEmail === data[index].value.projectOwnerEmail ||
						// 	collabs.includes(currentUserEmail)
						// ) {
						// 	linkIsVisible = true
						// }

						return (
							<Project
								key={data[index].id}
								title={data[index].value.title}
								description={data[index].value.description}
								id={data[index].id}
								isVisible={linkIsVisible}
								isShowingDelete={this.state.isShowingDelete}
							/>
						)
					})}
			</div>
		) : null

		let menu2 = this.state.showMenu2 ? (
			<>
				<h2 style={{ textAlign: 'center', paddingRight: '5%', marginTop: '2%' }}>
					Go to list of retrospectives:
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
									<Project
										key={data[index].id}
										title={data[index].value.title}
										description={data[index].value.description}
										id={data[index].id}
										isVisible
										isShowingDelete
									/>
								)
							} else return null
						})}
					{this.counter ? null : <h1>There are no projects currently avalaible!</h1>}
				</div>
			</>
		) : null

		let button1 = this.state.toggleButton1 ? (
			<div className={classes.ButtonContainer}>
				<i
					className='fas fa-plus-square'
					style={{
						color: 'green',
						marginLeft: '10px',
						cursor: 'pointer',
					}}
					onClick={() => this.showMenu1Handler(this.state.showMenu1)}
				></i>
			</div>
		) : (
			<div className={classes.ButtonContainer}>
				<i
					className='fas fa-minus-square'
					style={{
						color: 'red',
						marginLeft: '10px',
						cursor: 'pointer',
					}}
					onClick={() => this.showMenu1Handler(this.state.showMenu1)}
				></i>
			</div>
		)

		let button2 = this.state.toggleButton2 ? (
			<div className={classes.ButtonContainer}>
				<i
					className='fas fa-plus-square'
					style={{
						color: 'green',
						marginLeft: '20px',
						cursor: 'pointer',
					}}
					onClick={() => this.showMenu2Handler(this.state.showMenu2)}
				></i>
			</div>
		) : (
			<div className={classes.ButtonContainer}>
				<i
					className='fas fa-minus-square'
					style={{
						color: 'red',
						marginLeft: '20px',
						cursor: 'pointer',
					}}
					onClick={() => this.showMenu2Handler(this.state.showMenu2)}
				></i>
			</div>
		)

		return (
			<div className={classes.MainContainer}>
				<div className={classes.ProjectContainer}>
					<div className={classes.BigButton}>
						All projects
						{button1}
					</div>
					{menu1}
				</div>

				<div className={classes.ProjectContainer}>
					<div className={classes.BigButton}>
						My projects
						{button2}
					</div>
					{menu2}
				</div>
			</div>
		)
	}
}

export default Dropdown
