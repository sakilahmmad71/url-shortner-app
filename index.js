const express = require('express')

const connectDB = require('./config/db')
const indexRoute = require('./routes/index')
const urlRoute = require('./routes/url')


const app = express()

// Connect through database
connectDB()

app.use(express.json({ extended : false }))

// Define routes here
// ================================

app.use(indexRoute)
app.use(urlRoute)

// ================================

const port = 5000

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})