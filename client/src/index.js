import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

class App extends Component {
	constructor() {
		super()

		this.state = {}
	}

	render() {
		return (
			<div>
				<h1>Todo App</h1>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
