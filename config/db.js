
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/devToGo', { useNewUrlParser: true });

module.exports = mongoose;