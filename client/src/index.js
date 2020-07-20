import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"

import './styles.css';
import TodoItem from "./TodoItem"

class App extends Component {
	constructor() {
		super()

		this.state = {
			todo: "",
			todos: []
		}
	}

	deleteTodo = id => {
		axios
			.delete(`https://rec-flask-api.herokuapp.com/todo/${id}`)
			.then(
				this.setState({
					todos: this.state.todos.filter(todo => {
						return todo.id !== id
					})
				})
			)
			.catch(err => console.warn("deleteTodo error: ", err))
	}

	addTodo = e => {
		e.preventDefault()

		axios
			.post('https://rec-flask-api.herokuapp.com/todo', {
				title: this.state.todo,
				done: false
			})
			.then(res => {
				this.setState({
					todos: [...this.state.todos, res.data],
					todo: ""
				})
			})
			.catch(err => console.warn("addTodo Error: ", err))
	}

	handleChange = e => {
		this.setState({
			todo: e.target.value
		})
	}

	renderTodos = () => {
		return this.state.todos.map(todo => {
			return (
				<TodoItem key={todo.id} todo={todo} handleDelete={this.deleteTodo} />
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
				<form className="add-todo" onSubmit={this.addTodo}>
					<input
						type="text"
						placeholder="Add Todo"
						onChange={this.handleChange}
						value={this.state.todo}
					/>
					<button type="submit">Add</button>
				</form>

				{this.renderTodos()}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
