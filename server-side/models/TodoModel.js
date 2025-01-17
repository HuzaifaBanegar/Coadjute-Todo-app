const mongoose = require("mongoose");
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type:Boolean,
        default:false
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports= Todo;