const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yourSchema = new Schema({
  // Define your schema fields here
  name: String,
  age: Number,
  // ...
});

const YourModel = mongoose.model('YourModel', yourSchema);

module.exports = YourModel;
