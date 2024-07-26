const express = require('express');
const TrackedTime = require('../models/trackedTime.js')

const router = new express.Router();

router.get('/trackedTime', async (req, res) => {
      try {
            const trackedTime = await TrackedTime.find();
            if(!trackedTime){
                  res.status(404).send({error: 'trackedTime not found'})
                  return
            } else {
                  res.status(200).send(trackedTime)
            }
      
      } catch (error) {
            res.status(400).send(error);
      }
})

router.get('/trackedTime/:id', async(req, res) =>{
      try {
            const one = await TrackedTime.findById({_id: req.params.id})
            if(!one){
                  res.status(404).send({error: 'tracked time not found'})
                  return
            } else {
                  res.status(200).send(one)
            }
      } catch (error) {
            res.status(400).send(error)
      }
})

// router.get('/trackedtime/:taskId', async (req, res) =>{
//       const id = req.params.taskId;
//       console.log(id)
//       try {
//             const time = await TrackedTime.find().sort({"time": 3})
//             res.send(time)
//       } catch (error) {
//             res.status(400).send(error)
//       }
// })
router.post('/trackedTime', async (req, res) => {
      const trackedTime = new TrackedTime(req.body);
      try {
            await trackedTime.save()
            res.status(201).send(trackedTime)
      } catch (error) {
            res.status(400).send(error);
      }
})
router.patch('/trackedTime/:id', async (req, res) => {
      const filter = {_id: req.params.id};
      const update = {
            story: req.body.story,
            user: req.body.user,
            task: req.body.task,
            time: req.body.time}
      try {
            const trackedTime = await TrackedTime.findByIdAndUpdate(filter, update, {new:true})
            if(!trackedTime){
                  res.status(404).send({error:'Tracked time not found'})
                  return
            }
            res.status(200).send(trackedTime)
      } catch (error) {
            res.status(400).send(error);
      }
})
router.delete('/trackedTime/:id', async (req, res) => {
      try {
            await TrackedTime.deleteOne({_id: req.params.id})
            res.send("TrackedTime deleted")
      } catch (error) {
            res.status(400).send(error);
      }
})
module.exports = router;