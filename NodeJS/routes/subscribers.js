const express = require('express')
const router = express.Router()
router.use(express.json());

const Subscriber = require('../models/subscriber');




// gives us the router to play with, define routes 

// getting all

router.get('/', async (req, res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// getting one
router.get('/:id', getSubscriber, (req, res)=>{
    res.send(subscriber)
    //res.send(res.subscriber.subscribedChannel)
})
// creating one
router.post('/', async (req, res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
        console.log(req.body)
        console.log("Received POST Request")
    } catch (error) {
        res.status(400).json( {message : error.message})
    }
}) 

// updating one 
router.patch('/:id', getSubscriber, async (req, res)=>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }

    if(req.body.subscribedChannel != null){
        res.subscriber.subscribedChannel = req.body.subscribedChannel
    }

    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
})

// deleting one
router.delete('/:id', getSubscriber, async (req, res)=>{
    try {
        // res.json(res.subscriber)
        await res.subscriber.deleteOne()
        res.json({message : "Deleted subscriber successfully"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// writing the middleware function - go indepth later

async function getSubscriber(req, res, next){
    let subscriber 
    try {
        subscriber = await Subscriber.findById(req.params.id)

        if (subscriber==null){
            return res.status(400).json({message : "Cannot find the subscriber with this id"})
        }

    } catch (error) {
        return res.status(500).json({message : error.message})
    }

    res.subscriber = subscriber

    next()
}
module.exports = router