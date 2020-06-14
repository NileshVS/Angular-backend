const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

let userSchema = new mongoose.Schema({
    fullName: {type: String, required:true},
    emailId: {type: String, required:true},
    nationality: {type: String, required:true},
    mobile: {type: Number, required:true},
    file: {type: String, required:true}
})

let userModel = mongoose.model('user', userSchema);
module.exports = {userModel};