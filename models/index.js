var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/on-my-route');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var addressSchema = new mongoose.Schema({
  name: String,
  address: String
    // url_name: String,
  // owner_id: String,
  // content:  String,
  // date:     { type: Date, default: Date.now },
  // status:   Number
});

var Address = mongoose.model('Address', addressSchema);

module.exports = {
  Address: Address
};