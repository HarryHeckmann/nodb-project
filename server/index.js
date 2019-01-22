require("dotenv").config();
const express = require('express');
const {json} = require('body-parser')
const app = express();
const cors = require('cors')

// const {imageOfTheDay} = require('../src/components/main')
const {read} = require('./controller')
const {favorite} = require('./controller')
const {remove} = require('./controller')
const {update} = require('./controller')
const {displayfavorites} = require('./controller')
const {today} =  require('./controller')

app.use(cors())
app.use(json())

app.get("/api/today/", today)
app.get("/api/nasaImage", read)
app.get('/api/getfavorites/', displayfavorites)
app.post("/api/favorite", favorite)
app.delete('/api/delete/:id', remove)
app.put('/api/update/:id', update)


app.listen(3001, () => {
    console.log("hello")
})

