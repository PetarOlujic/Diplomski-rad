import React from 'react'
import classes from './WhiteboardLinks.module.css'

import { Link } from 'react-router-dom'

const WhiteboardLinks = (props) => {
	let link = (
		<Link className={classes.Link} to={'/project-whiteboard/' + props.id}>
			{props.title}
			<i
				className='fas fa-arrow-circle-right'
				style={{ paddingLeft: '10px', color: 'green' }}
			></i>
		</Link>
	)

	return (
		<div className={classes.Container}>
			<h2 className={classes.Title}>{link}</h2>
			<p className={classes.Paragraph}>{props.description}</p>
		</div>
	)
}

export default WhiteboardLinks
