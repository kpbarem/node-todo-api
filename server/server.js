var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo}  = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});


// GET /todos/1234
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //validate id using is valid if not respond with 404 and empty body
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //query db using find by id
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/todos/:id', (req, res) => {
  //get the ID

  var id = req.params.id;



  //validate the id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //remove by id

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });

});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
