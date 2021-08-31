import React from 'react'
import classes from './NavigationLinks.module.css'

import { NavLink } from 'react-router-dom'

const NavigationLinks = () => {
	return (
		<nav>
			<ul className={classes.Layout}>
				<li className={classes.Li}>
					<NavLink
						to='/'
						className={classes.Link}
						activeClassName={classes.ActiveLink}
						exact
					>
						Project overview
					</NavLink>
				</li>
				<li className={classes.Li}>
					<NavLink
						to='/project-whiteboard'
						className={classes.Link}
						activeClassName={classes.ActiveLink}
					>
						Project whiteboard
					</NavLink>
				</li>
				<li className={classes.Li}>
					<NavLink
						to='/create-a-project'
						className={classes.Link}
						activeClassName={classes.ActiveLink}
					>
						Create a project
					</NavLink>
				</li>
				<li className={classes.Li}>
					<NavLink
						to='/user'
						className={classes.Link}
						activeClassName={classes.ActiveLink}
					>
						User
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default NavigationLinks
