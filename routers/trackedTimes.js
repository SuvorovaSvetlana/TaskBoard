const express = require('express');
const TrackedTime = require('../models/trackedTime.js')
const router = new express.Router();

router.get('/trackedTime', async (req, res) => {
      try {
            const trackedTime = await TrackedTime.find({});
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
router.get('/trackedTime/:id', async (req, res) => {
      try {
            const trackedTime = await TrackedTime.findById({_id: req.params.id})
            if (!task) {
                  res.status(404).send({error:"TrackedTime not found"})
                  return
            } else {
                  res.status(200).send(trackedTime)
            }
            
      } catch (error) {
            res.status(400).send(error);
      }
})
router.post('/trackedTime', async (req, res) => {
      const trackedTime = new TrackedTime(req.body);
      try {
            await trackedTime.save()
      } catch (error) {
            res.status(400).send(error);
      }
})
router.patch('/trackedTime', async (req, res) => {
      try {
            
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