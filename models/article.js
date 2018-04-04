// Creating a model provides some structure to the database (remember that noSQL i.e. MongoDB is flexible, which can be a disadvantage at times)

let mongoose = require('mongoose');

// Article Schema
let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

let Article = module.exports = mongoose.model('Article', articleSchema);
