const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post("/",(req,res,next) =>{
    var name = req.body.name
    var password = req.body.password
    var query = Room.findOne({name:req.body.name});
    query.exec(
        function (err, user) {
            if (err) res.json({});

            const token = jwt.sign({
                    name:user.name

                },
                process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                })
            res.status(200).json({
                accessToken: token
            });

        }

    );


})
module.exports = router;
