import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// importing components
import CreateTodo from "./components/create-todo";
import EditTodo from "./components/edit-todo";
import TodosList from "./components/todo-list";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/#" target="_blank">
              <img src={logo} alt="logo" width="30" height="30"/>
            </a>
            <Link to="/" className="navbar-brand">To-Do App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">To-Do</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create To-Do</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          {/* routing config.  using paths to 3 separate components */}
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;