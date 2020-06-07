const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const User = require('../models/User');
router.get('/friends/add',checkAuth,(req,res,next)=>{
    res.json({})

})
router.get()
router.get('/register',(req,res,next)=>{
    const user = new User(
        {
            owner:req.body.name,
            password:req.body.password,
            friends:[],
            publicKey:req.body.publicKey
        }
    );
    const savedUser = room.save().then(data =>{
        res.status(200).json(data);
    }).catch(err =>{
        res.json({message:err});
    });

})
module.exports = router;
