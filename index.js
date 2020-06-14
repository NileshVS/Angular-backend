const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const config = require('config');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("tiny"))

require('../project/controller/database')(mongoose);
require('../project/controller/userRoutes')(app);

if(!config.get('jwtKey')){
    console.log('Secret key is not set, exiting...');
    process.exit(1);
};

app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen(port, ()=> console.log(`Server running on port ${port}`))