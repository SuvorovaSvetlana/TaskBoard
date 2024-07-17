const express = require('express');
const TaskComment = require('../models/taskComment');
const router = new express.Router();

router.get('/taskComments', async(req, res)=>{
      try {
            const taskComments = await TaskComment.find({})
            res.status(200).send(taskComments)
      } catch (error) {
            res.status(400).send(error)
      }
})
router.get('/taskComments/:id', async(req, res)=>{
      try {
            const taskComment = await TaskComment.findById({_id: req.params.id})
            if (!taskComment) {
                  res.status(400).send({error: "Task Comment not found"})
                  return
            } else {
                  res.status(200).send(taskComment)
            }
      } catch (error) {
           res.status(400).send(error)
      }
})
router.post('/taskComments', async(req, res)=>{
      const taskComment = new TaskComment(req.body);
      try {
            await taskComment.save()
            res.status(201).send(taskComment)
      } catch (error) {
            res.status(400).send(error)
      }
})
router.patch('/taskComments/:id', async(req, res)=>{
      const filter = {_id: req.params.id};
      const update = {
            text: req.body.text,
           _author: req.body._author,
      }
      try {
            const taskComment = await TaskComment.findByIdAndUpdate(filter, update, {new:true})
            if(!taskComment){
                  res.status(404).send({error:'task comment not found'})
                  return
            }
            res.status(200).send(taskComment)
      } catch (error) {
            res.status(400).send(error)
      }
})
router.delete('/taskComments/:id', async(req, res)=>{
      try {
            await TaskComment.deleteOne({_id: req.params.id})
            res.send("TaskComment deleted")
      } catch (error) {
            res.status(400).send(error)
      }
})


module.exports = router;