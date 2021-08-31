import React, { useEffect, useState } from 'react'
import classes from './Retrospective.module.css'

import firebase from '../../../firebase'
import Modal from '../../UI/Modal/Modal'

const Retrospective = (props) => {
	let [numberOfLikes, setNumberOfLikes] = useState(0)
	let [numberOfDislikes, setNumberOfDislikes] = useState(0)
	let [collaborators, setCollaborators] = useState([])
	let [isDeleted, setIsDeleted] = useState(false)

	// useEffect(() => {
	// 	const db = firebase.firestore()
	// 	db.collection('projects')
	// 		.doc(props.id)
	// 		.get()
	// 		.then((querySnapshot) => {
	// 			let array = []
	// 			array.push(
	// 				...querySnapshot.data().collaborators.map((el) => {
	// 					return el.value
	// 				}),
	// 				querySnapshot.data().projectOwnerEmail
	// 			)
	// 			setCollaborators(array)
	// 			// console.log(collaborators)
	// 		})
	// }, [])

	const deleteRetrospectiveHandler = () => {
		const db = firebase.firestore()
		db.collection('retrospectives')
			.doc(props.id)
			// Problem je sta mi je u bazi spremljen niz objekata, i nemam nacina kako pristupit pojedinacnom objektu i izbrisat ga
			// Pa shodno tome, ovaj delete brise sve retrospektive
			// .update({
			// 	retrospective: {
			// [props.description]: firebase.firestore.FieldValue.delete(),
			// [props.description]: firebase.firestore.FieldValue.arrayRemove(),
			// [props.selection]: firebase.firestore.FieldValue.arrayRemove(),
			// [props.selection]: firebase.firestore.FieldValue.delete(),
			// 	},
			// })
			.delete()
			.then(setIsDeleted(true))
			.then(
				setTimeout(() => {
					window.location.reload()
				}, 1500)
			)
	}

	const likeButtonHandler = () => {
		if (numberOfLikes < 1) {
			setNumberOfLikes(numberOfLikes + 1)
		} else {
			setNumberOfLikes(numberOfLikes - 1)
		}
	}

	const dislikeButtonHandler = () => {
		if (numberOfDislikes < 1) {
			setNumberOfDislikes(numberOfDislikes + 1)
		} else {
			setNumberOfDislikes(numberOfDislikes - 1)
		}
	}

	// console.log(props.description)

	return (
		<>
			<div className={classes.Container}>
				<span className={classes.Span}>{props.description}</span>
				<span
					className={props.selection === 'Start' ? classes.CircleGreen : classes.Circle}
				>
					{/* {console.log(attachedClasses, 'span')} */}
				</span>
				<span
					className={props.selection === 'Stop' ? classes.CircleGreen : classes.Circle}
				></span>
				<span
					className={
						props.selection === 'Continue' ? classes.CircleGreen : classes.Circle
					}
				></span>
			</div>
			<div className={classes.LikeContainer}>
				<button className={classes.Button} onClick={likeButtonHandler}>
					Like
					{' ' + numberOfLikes}
				</button>
				<button className={classes.Button} onClick={dislikeButtonHandler}>
					Dislike
					{' ' + numberOfDislikes}
				</button>
				<div className={classes.DeleteButton} onClick={deleteRetrospectiveHandler}>
					<i className='fas fa-trash-alt fa-lg' style={{ color: 'red' }}></i>
				</div>
			</div>
			<Modal show={isDeleted}>
				<h2>Retrospective was deleted!</h2>
			</Modal>
		</>
	)
}

export default Retrospective
