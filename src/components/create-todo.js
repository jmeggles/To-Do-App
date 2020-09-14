import React, { Component } from "react";
import axios from "axios"; 

// exporting this component to import at App.js 
export default class CreateTodo extends Component {

    // accepts inputs of properties.....
    constructor(props) {
        // super is the parent constructor and passing in props
        super(props);
        // Because in the 3 implemented methods we’re dealing with the component’s state object we need to make sure to bind those methods to this by adding the following lines of code to the constructor:
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // ...and returns these elements to appear on screen. this.state contains data specific to this component that may change over time. treat as immutable.
        this.state = {
            todo_description: " ",
            todo_priority: " ",
            todo_completed: false
        }
    }
    // these onChange methods will update the state properties
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    // finally, these methods will handle the submit event which will create a new to-do item.
    onSubmit(e) {
        // Inside this method we need to call e.preventDefault to ensure that the default HTML form submit behaviour is prevented. Because the back-end of our application is not implemented yet we’re only printing out what’s currently available in the local component’s state to the console. 
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`To-Do Description: ${this.state.todo_description}`);
        console.log(`To-Do Prority: ${this.state.todo_priority}`);
        console.log(`To-Do Completed: ${this.state.todo_completed}`);

        // in the third installment, adding the object {} 
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        // added in the third installlment of this project; this is the endpoint that accepts the incoming post request. the axios post returns a promise
        axios.post("http://localhost:3001/todos/add", newTodo)
            .then(res => console.log(res.data));
            

        // Finally we’re making sure that the form is reset by resetting the state object.
        this.setState({
            todo_description: " ",
            todo_priority: " ",
            todo_completed: false
        })
    }
    // render, return, div is the front end of what appears on the page for the user 
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New To-Do</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input  className="btn btn-primary"
                                type="submit" 
                                value="Create To-Do"  
                                />
                    </div>
                </form>
            </div>
        )
    }
}