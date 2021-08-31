import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProjectOverview from '../ProjectOverview/ProjectOverview'
import ProjectWhiteboard from '../ProjectWhiteboard/ProjectWhiteboard'
import CreateAProject from '../CreateAProject/CreateAProject'
import RetrospectiveList from '../RetrospectiveList/RetrospectiveList'
import User from '../User/User'
import NavigationLinks from './NavigationLinks/NavigationLinks'
import Whiteboard from '../ProjectWhiteboard/Whiteboard/Whiteboard'

const navigation = (props) => {
	return (
		<Router>
			<div>
				<NavigationLinks />
			</div>
			<Switch>
				<Route path='/' exact>
					<ProjectOverview />
				</Route>
				<Route path='/project-overview'>
					<ProjectOverview />
				</Route>
				<Route path='/project-whiteboard' exact>
					<ProjectWhiteboard />
				</Route>
				<Route path='/create-a-project'>
					<CreateAProject />
				</Route>
				<Route path='/user'>
					<User logout={props.logout} />
				</Route>
				<Route exact path='/retrospective-list/:id'>
					<RetrospectiveList />
				</Route>
				<Route path='/project-whiteboard/:id'>
					<Whiteboard />
				</Route>
			</Switch>
		</Router>
	)
}

export default navigation
