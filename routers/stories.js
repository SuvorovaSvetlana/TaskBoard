const Mongoose = require('mongoose')
const express = require('express');
const Story = require('../models/story.js');
const router = new express.Router();

router.get('/stories', async(req, res)=>{
      try {
            const stories = await Story.find({})
            res.status(200).send(stories)
      } catch (error) {
            res.status(400).send(error)
      }
})

router.get('/stories/trackedTime/:id', async (req, res) =>{
      const id = req.params.id
      try {
            const tasks = await Story.aggregate([
                  {
                        $match: {
                              _id: new Mongoose.Types.ObjectId(`${id}`)
                        }
                  },
                  {
                        $lookup: {
                              from: "tasks",
                              localField: "trackedTime",
                              foreignField: "task",
                              as: "tasks_by_stories"
                        }
                  }
            ])
           if (!tasks) {
                  res.send({error: "Story not found"})
           } else {
            res.send(tasks)
           }
        
      } catch (error) {
            res.status(400).send(error)
      }
})


router.get('/stories/:id', async(req, res)=>{
      try {
            const story = await Story.findById({_id:req.params.id});
            if(!story){
                  res.status(400).send({error: "Story not found"})
                  return
            }
            res.status(200).send(story)
      } catch (error) {
            res.status(400).send({error: ' error'})
      }   
})

router.post('/stories', async(req, res)=>{
      const story = new Story(req.body);
      try {
            await story.save()
            res.status(201).send(story)
      } catch (error) {
            res.status(400).send(error)
      }
})

router.patch('/stories/:id', async(req, res)=>{
      const filter = {_id: req.params.id};
      const update = {
            title: req.body.title,
            description: req.body.description,
            estimation: req.body.estimation,
            totalTime: req.body.totalTime,
            task: req.body.task,
      }
      try {
            const story = await Story.findByIdAndUpdate(filter, update, {new:true})
            if(!story){
                  res.status(404).send({error:'story not found'})
                  return
            }
            res.status(200).send(story)
      } catch (error) {
            res.status(400).send(error)
      }
})
router.delete('/stories/:id', async(req, res)=>{
      try {
            await Story.deleteOne({_id: req.params.id})
            res.send("Story deleted")
      } catch (error) {
            res.status(400).send(error)
      }
})
module.exports = router;