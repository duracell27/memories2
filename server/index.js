const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const dotenv = require('dotenv')


const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

app.use(cors())
app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.get('/', (req, res)=>{
    res.send('Привіт Спогади АПІ)')
})

//const CONNECTION = process.env.CONNECTION
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION).then(()=>{app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})}).catch(ERROR=>console.log(ERROR.message))