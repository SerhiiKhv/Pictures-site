const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()

const Place = require('./models/place')

const bookingRequest = require('./RequestsType/bookingRequests')
const placesRequest = require('./RequestsType/placesRequests')
const accountRequest = require('./RequestsType/accountRequests')
const profileRequest = require('./RequestsType/profileRequests')
const uploadRequest = require('./RequestsType/uploadsReqests')

const jwtSecret = 'asdfghas14djhf4312adsghsdjf'

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + "/uploads"))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)

app.get('/user-places', (req, res) => {
    const {token} = req.cookies

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner: id}))
    })
})


app.use('/booking', bookingRequest);
app.use('/places', placesRequest);
app.use('/account', accountRequest);
app.use('/profile', profileRequest);
app.use('/upload', uploadRequest);

app.listen(4000)