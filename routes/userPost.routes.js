const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const user = require('../mongodb/userSchema');

router.post('/user_post', async (req, res) => {
    try {
        let { error } = joiValidation(req.body);
        console.log("Joi validation: ", error)
        if (error) { return res.send(error.details[0].message); }
        console.log("request: ", req.body)
        let newUser = user.userModel({
            fullName: req.body.fullName,
            emailId: req.body.emailId,
            nationality: req.body.nationality,
            mobile: req.body.mobile,
            file: req.body.file
    })
    
    let salt = await bcrypt.genSalt(10);
    newUser.emailId = await bcrypt.hash(newUser.emailId, salt);
    console.log("user: ", newUser);
    let savedUser = await newUser.save();
    res.send({
        msg: "Registration completed!",
        details: savedUser
    });
}
    catch (er) {
        res.send(er)
    }
})

function joiValidation(para) {
    let joiSchema = Joi.object({
        fullName: Joi.string().required(),
        emailId: Joi.string().required(),
        nationality: Joi.string().required(),
        mobile: Joi.number().required(),
        file: Joi.string().required()
    });

    return joiSchema.validate(para);
}

module.exports = router;