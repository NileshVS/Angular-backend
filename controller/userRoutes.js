const express = require('express');
const { request } = require('express');
const user = require('../routes/userPost.routes');
const file = require('../routes/fileUpload.routes')

module.exports = (app)=>{
    app.use(express.json());

    app.use('/api',[user, file]);
}