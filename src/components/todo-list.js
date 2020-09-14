import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 
const Todo = props => (
    <tr>
        {/* table data */}
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
);

export default class TodoList extends Component {
    // third installment for this project
    constructor(props) {
        super(props);
        // contain a property of todos with an empty array
        this.state = { todos: [] };
    }

    // method to request backend and retrieve list of todos
    componentDidMount() {
        axios.get("http://localhost:3001/todos/")
            .then(response => {
                // setState passing in an object containing the todos state property; not set to an empty array.  it's set to the data getting de;ivered with the response object.  assigning todos in the state
                this.setState({ todos: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // final installment, adding the update info to delete todo
    componentDidUpdate() {
        axios.get("http://localhost:3001/todos/")
        .then(response => {
            this.setState({todos: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    todoList() {
        // iterating over whats inside of this.state.todos with map method with a callback function for every item. the function will get the currentTodo item as the first argument and index (i) as the second argument
        return this.state.todos.map(function (currentTodo, i) {
            // the return will get back every todo item with the component is getting passed into a prop named todo and set to what's inside currentTodo
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>To-Dos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                        {/* helper method to get back jsx code for the rows of the table */}
                    </tbody>
                </table>
            </div>
        )
    }
}