const express = require('express');
const Place = require("../models/place");
const getUserDataFromReq = require("../functions/getUserDataFromReq");

const router = express.Router();

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
    const page = parseInt(req.query.page) || 1; // Поточна сторінка (порція)
    const itemsPerPage = parseInt(req.query.cout) || 10; // Кількості елементів які потрібно буде повернути

    const startIndex = (page - 1) * itemsPerPage;

    try {
        const totalItems = await Place.countDocuments(); // Загальна кількість елементів
        const places = await Place.find().skip(startIndex).limit(itemsPerPage);

        res.json({
            places,
            currentPage: page,
            totalItems: totalItems
        });
    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

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