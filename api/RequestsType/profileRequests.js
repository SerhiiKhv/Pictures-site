const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

const jwtSecret = 'asdfghas14djhf4312adsghsdjf'
router.get('/', (req, res) => {
    const {token} = req.cookies

    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id)
            res.json({name, email, _id})
        })
    } else {
        res.json(null)
    }
})

module.exports = router;