const express = require('express');
const Task = require('../models/task.js');
const router = new express.Router();

router.get('/tasks', async (req, res) => {
      try {
            const tasks = await Task.find({})
            if (!tasks) {
                  res.status(404).send({error: 'Tasks not found'})
            } else {
                  res.status(200).send(tasks)
            }
      } catch (error) {
            res.status(400).send(error);
      }
})

router.get('/tasks/:id', async (req, res) => {
        try {
            const task = await Task.findById({_id: req.params.id})
            if (!task) {
                  res.status(404).send({error:"Task not found"})
            } else {
                  res.status(200).send(task)
            }
        } catch (error) {
            res.status(400).send(error)
        }
})

router.post('/tasks', async(req, res) => {
      const task = new Task(req.body)
      try{
            await task.save();
            res.status(201).send(task);
      }catch(error){
            res.status(400).send(error)
      }
})

router.patch('/tasks/:id', async (req, res)=>{
      const filter = {_id: req.params.id};
      const update = {
            title: req.body.title,
            description: req.body.description,
            _author: req.body._author,
            _executor: req.body._executor,
            type: req.body.type,
            status: req.body.status,
            deadline: req.body.deadline}
      try {
            const task =  await Task.findByIdAndUpdate (filter, update, {new:true});
            if(!task){
                  res.status(404).send({error:'Task not found'})
            }
            res.status(200).send(task)
      } catch (error) {
            res.status(400).send(error)
      }
})

router.delete('/tasks/:id', async (req, res) =>{
      try {
            await Task.deleteOne({_id: req.params.id})
            res.send("Task deleted")
      }catch(error){
           res.status(400).send(error)
      }
})

module.exports = router;