const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtSecret = require("../functions/jwtSecret");

const router = express.Router();

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