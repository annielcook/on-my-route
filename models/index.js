var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/on-my-route');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var addressSchema = new mongoose.Schema({
    name: String,
    address: String
});

var tripSchema = new mongoose.Schema({
    start: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    end: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    route_name: String
})


module.exports = {
    Address: mongoose.model('Address', addressSchema),
    Trip: mongoose.model('Trip', tripSchema)
};