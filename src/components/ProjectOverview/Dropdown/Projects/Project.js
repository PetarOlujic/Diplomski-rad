import React, { useState } from 'react'
import classes from './Project.module.css'

import firebase from '../../../../firebase'
import { Link } from 'react-router-dom'
import Modal from '../../../UI/Modal/Modal'

const Project = (props) => {
	const [isDeleted, setIsDeleted] = useState(false)

	const deleteHandler = () => {
		console.log(props.id)
		firebase
			.firestore()
			.collection('projects')
			.doc(props.id)
			.delete()
			.then(setIsDeleted(true))
			.then(
				setTimeout(() => {
					window.location.reload()
				}, 1500)
			)
	}

	let link = props.isVisible ? (
		<Link className={classes.Link} to={'/retrospective-list/' + props.id}>
			{props.title}
			<i
				className='fas fa-arrow-circle-right'
				style={{ paddingLeft: '10px', color: 'green' }}
			></i>
		</Link>
	) : (
		<div>{props.title}</div>
	)

	return (
		<>
			<div className={classes.Container}>
				<h2 className={classes.Title}>{link}</h2>
				<p className={classes.Paragraph}>{props.description}</p>
				{props.isShowingDelete ? (
					<div className={classes.DeleteButton} onClick={deleteHandler}>
						<i className='fas fa-trash-alt fa-lg' style={{ color: 'red' }}></i>
					</div>
				) : null}
			</div>
			<Modal show={isDeleted}>
				<h2 style={{ textAlign: 'center' }}>Delete successful!</h2>
			</Modal>
		</>
	)
}

export default Project
