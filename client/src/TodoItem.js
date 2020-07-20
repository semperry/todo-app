import React, { Component } from "react"
import axios from "axios"

class TodoItem extends Component {
	constructor(props) {
		super(props)

		this.state = {
			done: props.todo.done
		}
	}

	toggleDone = () => {
		const { done } = this.state

		axios.patch(`https://rec-flask-api.herokuapp.com/todo/${this.props.todo.id}`,
			{
				done: !done
			}
		)
			.then(
				this.setState({
					done: !done
				})
			)
			.catch(err => console.warn("toggleDone err ", err))
	}

	render() {
		const { handleDelete, todo } = this.props

		return (
			<div className="todo-item">
				<input
					type="checkbox"
					onClick={this.toggleDone}
					defaultChecked={this.state.done}
				/>

				<p className={this.state.done ? "done" : null}>{todo.title}</p>

				<button onClick={() => handleDelete(todo.id)}>X</button>
			</div>
		)
	}
}

export default TodoItem