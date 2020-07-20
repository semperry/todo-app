import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"

import './styles.css';

class App extends Component {
	constructor() {
		super()

		this.state = {
			todos: []
		}
	}

	renderTodos = () => {
		return this.state.todos.map(todo => {
			return (
				<div key={todo.id}>
					{todo.title}
				</div>
			)
		})
	}

	componentDidMount() {
		axios
			.get('https://rec-flask-api.herokuapp.com/todos')
			.then(response => this.setState({
				todos: response.data
			})
			)
			.catch(err => console.warn("Fetch Todos Err: ", err))
	}

	render() {
		return (
			<div>
				<h1>Todo App</h1>
				<div />

				{this.renderTodos()}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
