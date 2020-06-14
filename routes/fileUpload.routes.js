const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const path = require('path');
const multer = require('multer');
const file = require('../mongodb/fileSchema');
let filePort = 'http://localhost:3000';
let pathDir = path.join(__dirname, '../uploads');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathDir);
    },
    filename: function (req, file, cb) {
        // console.log(file.destination);
        cb(null, Date.now() + file.originalname);
    },
});

let upload = multer({
    storage: storage
});

router.post('/upload_file', upload.single('fileUrl'), async(req, res)=>{
    console.log("File : ",req.file);
    let newFile = new file.fileModel({
        fileUrl: filePort+ '/uploads/' + req.file.filename,
        fileDest: (pathDir + '/' + req.file.filename).replace(/\\/g,"/")
	} )
	
	await newFile.save();
	res.send(JSON.stringify(newFile.fileUrl));
})

router.get('/view_file', async (req,res) => {
    let links = await file.fileModel.find();
    res.send(links);
});

module.exports = router;
