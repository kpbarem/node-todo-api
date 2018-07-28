const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove(({})).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({'_id: 5b5cea7e12bc39a68e389a15'}).then((todo) => {
  console.log('todo', todo);
});

Todo.findByIdAndRemove('5b5cea7e12bc39a68e389a15').then((todo) => {
  console.log('todo', todo);
});
