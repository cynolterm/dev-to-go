const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    username: String,
    password: String,
    developer: Boolean,
    skills: Array,
    location: String,
    name: String,
    description: String,
    wage: Number,
    contact: String
});

module.exports = User;