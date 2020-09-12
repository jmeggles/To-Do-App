const express = require("express");
const app = express(); // create a new instance of express
const bodyParser = require("body-parser"); // middleware
const cors = require("cors"); // middleware
const mongoose = require("mongoose"); // library allows us to deal in an object-oriented way wih mongodb
const todoRoutes = express.Router();

const PORT = 3001

// bring in the todoDB from the model.js
let Todo = require("./todo.model");

// adding middleware by calling 'use' then passing the instance (cors) which is created by calling the cors function.
app.use(cors());
app.use(bodyParser.json());

// connecting to mongoDB with a configuration parameter 
mongoose.connect("mongodb://127.0.0.1:27017/todos", {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once("open", function() {
    console.log(" **** MongoDB connection established successfully!! *** ");
})

// retrieves all todos
todoRoutes.route("/").get(function(req, res) {
    // pass in the call back function with 2 parameteres, the err object and todos from the database.
    Todo.find(function(err, todos) {
        if (err) {
            console.log("home errrr: " + err);
        } else {
            // attaching what we are getting back from the DB to the response object in JSON format and to do so we are calling res.json and passing in the todos object.  todos will come back from the DB
            res.json(todos);
        }
    });
});

// path with extension per id and get the incoming requests with a callback function. the logic retrieves the id j
todoRoutes.route("/:id").get(function(req, res) {
    // get the value which is available in the ID param of the URL. acessing params object then . then name of param then . then id
    let id = req.params.id;
    Todo.findById(id, function(err, todos) {
            res.json(todos);
    });
});

todoRoutes.route("/add").post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
    // async await
        .then(todo => {
            res.status(200).json({"todo": "todo addedd successfully"});
        }) 
        .catch(err => {
            res.status(400).send("adding new todo FAILED");
        });
});

todoRoutes.route("/update/:id").post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
    });
});

// the router as a middleware which will take control of requests starting with `/todos`.
app.use("/todos", todoRoutes);

// the server starts up with a callback function to the command line which is executed once the server process starts successfully
app.listen(PORT, function() {
    console.log("==> 🌎 Visit http://localhost:3001/ 🌎 <== ");
})

