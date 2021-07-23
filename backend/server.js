const mongoose = require('mongoose')
const app = require('./express')
const config = require('./config/config')
const express = require('express')

require('dotenv').config()

app.use(express.json())

mongoose.connect(process.env.mongodbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log("error connecting to the database")
        console.log(err)
    } else {
        console.log("connected")
    }
})

app.get('/', (req, res) => {
    return res.send('Homepage')
})

app.use(require('./routes/index'))

app.use(express.static('./public'))

app.listen(config.PORT, () => console.log(`listening on PORT ${config.PORT}`))