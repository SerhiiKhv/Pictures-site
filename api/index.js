const express = require('express')
const app = express()

app.get('/test', (req, res) => {
    res.json("Test ok")
})

app.listen(4000)