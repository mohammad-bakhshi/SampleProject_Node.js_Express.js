const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required."],
    },
    text: {
        type: String,
        required: [true, "text is required."]
    },
    image: {
        type: String
    },
    views: {
        type: Number
    }
}, { timestamps: true });
const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;