const mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
    fileUrl: {type: String, required:true},
    fileDest: {type: String, required:true}
})

let fileModel = mongoose.model('file', fileSchema);
module.exports = {fileModel};