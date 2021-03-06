const mongoose = require("mongoose");
const Schema = mongoose.Schema; // accessing the schema object

// to-do info that will be stored in the db
let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model("Todo", Todo);