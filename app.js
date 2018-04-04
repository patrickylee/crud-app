const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connects to database
mongoose.connect('mongodb://localhost/nodekb');

// Sets db variable to the mongoose connection
let db = mongoose.connection;

// Check for db errors
db.on('error', function(err) {
  console.log(err)
});

// Check connection to MongoDB
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Initialize the app
const app = express();

// Bring in Models
let Article = require('./models/article');

// Load the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function(req, res) {
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  });
});

// Add Route
app.get('/articles/add', function(req, res) {
  res.render('add_article', {
    title: 'Add Article'
  });
});

// Load Edit Form
app.get('/article/edit/:id', function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (err) {
      console.log('there is an error');
    } else {
      res.render('edit_article', {
        mainTitle: 'Edit Article',
        article: article
      })
    }
  })
})

// Get Single Article
app.get('/article/:id', function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (err) {
      console.log('there is an error');
    } else {
      res.render('article', {
        article:article
      })
    }
  })
})

// Add SUBMIT Post Route
app.post('/articles/add', function(req, res) {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(err) {
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// Update SUBMIT Post Route
app.post('/articles/edit/:id', function(req, res) {
  let article = {}; // Creating an empty object so we can fill it with the newly inputted information and then use this object as the modified information in the update() method below
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id:req.params.id} // so we can tell the update() method which article we're updating; otherwise, the query won't be able to know which article we want to modify
                                  // We use the request's parameter, which includes the id
  Article.update(query, article, function(err) { // update the previous version of this article with the newly inputted information
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/'); // Redirect to home page if the update was successful
    }
  });
});

app.delete('/article/:id', function(req, res) {
  let query = {_id:req.params.id};

  Article.remove(query, function(err) {
    if(err){
      console.log(err);
    }
      res.send('Success');
  });
});

// Start server
app.listen(3000, function() {
  console.log("The server has started on port 3000");
});
