const express = require('express');
const Booking = require("../models/booking");

const router = express.Router();
const jwtSecret = 'asdfghas14djhf4312adsghsdjf'
const jwt = require('jsonwebtoken')

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            resolve(userData)
        })
    })
}
router.post('/', async (req, res) => {
    const userData = await getUserDataFromReq(req)

    const {checkIn, checkOut, name, phone, numberGuests, place, price} = req.body

    const placeDoc = await Booking.create(
        {checkIn, checkOut, name, phone, numberGuests, place, price,
            user: userData.id}
    )

    res.json(placeDoc)
})

router.get('/', async (req, res) => {
    const userData = await getUserDataFromReq(req)

    res.json(await Booking.find({user: userData.id}).populate('place'))
})

router.get('/:id', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    const {id} = req.params

    const searchBooking = await Booking.find({user: userData.id}).populate('place')

    res.json(await searchBooking.find(({_id}) => _id == id))
})

module.exports = router;