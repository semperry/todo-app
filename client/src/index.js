import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"

import './styles.css';
import TodoItem from "./TodoItem"

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
				<TodoItem key={todo.id} todo={todo} />
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
			<div className="app">
				<h1>Todo App</h1>
				<div />

				{this.renderTodos()}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
