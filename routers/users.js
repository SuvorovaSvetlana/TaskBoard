const express = require('express');
const User = require('../models/user.js');
const router = new express.Router();

router.get('/users', async(req, res) => {
      try{
           const users = await User.find({});
           if(!users){
                  res.status(404).send({error:"Users not found"})
           }else{
                  res.status(200).send(users)
           }
      }catch(error){
            res.status(400).send(error)
      }
})

router.get('/users/:id', async (req, res) => {
      try{
           const user = await User.findById({_id: req.params.id})
           if(!user){
                  res.status(404).send({error:"User not found"})
           }else{
                  res.status(200).send(user)
           }
      }catch(error){
            res.status(400).send(error)
      }
})

router.post('/users', async(req, res) => {
      const user = new User(req.body)
      try{
            await user.save();
            res.status(201).send(user)
      } catch(error){
            res.status(400).send(error)
      }
})

router.patch('/users/:id', async(req, res) =>{
      const filter = {_id: req.params.id}
      console.log(filter)
      try{
            const result =  await User.findOneAndUpdate({_id: req.params.id}, {name: req.body.name},{new: true})
            res.status(200).send(result)  
      }catch(error){
            res.status(400).send(error)
      }
})
router.delete('/users/:id', async(req, res) => {
      try {
            await User.deleteOne({_id: req.params.id})
            res.send("User deleted")
      }catch(error){
           res.status(400).send(error)
      } 
})

module.exports = router;