const Mongoose = require('mongoose')

const express = require('express');
const Task = require('../models/task.js');
const router = new express.Router();

router.get('/tasks', async (req, res) => {
      try {
            const tasks = await Task.find({})
            if (!tasks) {
                  res.status(404).send({error: 'Tasks not found'})
                  return
            } else {
                  res.status(200).send(tasks)
            }
      } catch (error) {
            res.status(400).send(error);
      }
})

router.get('/tasks/spentTime/:id', async (req, res) =>{
    const id = req.params.id;
      try {
            const fullTime = await Task.aggregate([
                  {
                        $match:{story: new Mongoose.Types.ObjectId(`${id}`)}
                  },
                  {
                        $unwind: { path: '$trackedTime'}
                  },
                  {
                        $lookup:{
                              from: 'trackedtimes',
                              localField: 'trackedTime',
                              foreignField: '_id',
                              as: 'time'
                        }
                  },
                  {
                        $unwind: {path: '$time'}
                  },
                  {
                        $addFields: {
                              time: '$time.time'
                        }
                  },
                  {
                        $project: { '_id': 0, 'time': 1}
                        
                  },
                  {
                        $group: {
                              _id: 'time',
                              spentTime: { $sum: '$time'}
                        }
                  }

            ])
            if(!fullTime){
                  res.status(404).send({error: 'Time not tracked yet'})
                  return
            }
            res.status(200).send(fullTime)
      } catch (error) {
            res.status(400).send(error)
      }
})

router.get('/tasks/:id', async (req, res) => {
        try {
            const task = await Task.findById({_id: req.params.id})
            if (!task) {
                  res.status(404).send({error:"Task not found"})
                  return
            } else {
                  res.status(200).send(task)
            }
        } catch (error) {
            res.status(400).send(error)
        }
})




router.get('/trackedTimeByOneTask/:id', async(req, res)=>{
   
      try {
            const trackedTimeByOneStory = await Task.findById({_id: req.params.id}).populate('trackedTime');
            const trackedTime = trackedTimeByOneStory.trackedTime;
           if(trackedTime){
            let fulltime =  trackedTime.reduce(function (akk, item) {
                  return akk + item.time
            }, 0)
            console.log(fulltime)
            res.status(200).send({trackedTime, fulltime})
            return
           }
           res.send({error:"No tracked time yet"})
           
      } catch (error) {
            res.status(400).send(error);
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
            type: req.body.type,
            status: req.body.status,
            executor: req.body.executor,
            trackedTime: req.body.trackedTime,
            story: req.body.story,
            deadline: req.body.deadline}
      try {
            const task =  await Task.findByIdAndUpdate (filter, update, {new:true});
            if(!task){
                  res.status(404).send({error:'Task not found'})
                  return
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