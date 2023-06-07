require('dotenv').config()
console.log("Working")
const express = require('express')
const mongoose = require('mongoose')
 const app = express()

//mongoose.connect(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL,  {useNewUrlParser: true})


const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('connected to the database'))


app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

const router = express.Router()
// gives us the router to play with, define routes 

// getting all

router.get('/', (req, res)=>{
    res.send("Hello World")
    // console.log("Subscribers get request")
})

app.listen(3000, ()=> console.log('Server Started'))