const express = require('express');
const router = express.Router();
const User = require('../models/us.js');

//getting all...
router.get('/',async (req,res)=>{
    // res.send('Hello World');
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({ message: err.message})
    }
})
//getting one...
router.get('/:id',getUser,(req,res)=>{
    res.send(res.user);
})
//creating one...
router.post('/',async (req,res)=>{
    const user = new  User({
        name: req.body.name,
        hobbies:req.body.hobbies,
        college:req.body.college,
        address:req.body.address
    })
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
        // const users = await User.find();
        // res.json(users);
    }catch(err){
        res.status(400).json({ message: err.message})
    }
})
//updating one...
router.patch('/:id',getUser, async (req,res)=>{
    if(req.body.name != null){
        res.user.name = req.body.name;
    }
    if(req.body.hobbies != null){
        res.user.hobbies = req.body.hobbies;
    }
    if(req.body.college != null){
        res.user.college = req.body.college;
    }
    if(req.body.address != null){
        res.user.address = req.body.address;
    }

    try{
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    }catch(err){
        res.status(400).json({message:err.message});
    }
})
//deleting one...
router.delete('/:id',getUser, async (req,res)=>{
    try{
        await res.user.remove();
        res.json({message:'Deleted user'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

async function getUser(req,res,next){
    let user;
    try{
        user = await User.findById(req.params.id);
        if(user==null){
            return res.status(404).json({message:'Cannot find user with the given id'});
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.user = user;
    next();
}
module.exports = router;