const express = require('express');
const jwt = require("jsonwebtoken");
const Place = require("../models/place");

const router = express.Router();
const jwtSecret = 'asdfghas14djhf4312adsghsdjf'

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            resolve(userData)
        })
    })
}

router.post('/', async (req, res) => {
    const {
        title, address, photos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body

    const userData = await getUserDataFromReq(req)

    const placeDoc = await Place.create({
        owner: userData.id,
        title, address, photos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    })
    res.json(placeDoc)

})

router.get('/', async (req, res) => {
    res.json(await Place.find())
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})

router.put('/', async (req, res) => {
    const {
        id, title, address, photos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body

    const userData = await getUserDataFromReq(req)

    const placeDoc = await Place.findById(id)

    if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
            title, address, photos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        })
        await placeDoc.save()
        res.json('ok')
    }
})

module.exports = router;