const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    author_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
         default: () => {
            return new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    },
    attribute1: {
        type: String
    },
    attribute2: {
        type: String
    },
    attribute3: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;