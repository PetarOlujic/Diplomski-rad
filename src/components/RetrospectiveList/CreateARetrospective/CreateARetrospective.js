import React from 'react'
import classes from './CreateARetrospective.module.css'

const CreateARetrospective = () => {
	return (
		<div className={classes.AddContainer}>
			<i
				className='fas fa-plus-circle fa-lg'
				style={{ color: 'green', paddingRight: '10px' }}
			></i>
			Add
		</div>
	)
}

export default CreateARetrospective
