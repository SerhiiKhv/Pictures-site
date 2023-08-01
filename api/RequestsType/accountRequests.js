const express = require('express');
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const jwtSecret = 'asdfghas14djhf4312adsghsdjf'
const bcryptSalt = bcrypt.genSaltSync(10)

router.post('/register', async (req, res) => {
    const {name, password, email} = req.body

    try {
        const userDov = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDov)
    } catch (e) {
        res.status(422).json(e)
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    const userDov = await User.findOne({email})

    if (userDov) {
        const passOk = bcrypt.compareSync(password, userDov.password)
        if (passOk) {
            jwt.sign({email: userDov.email, id: userDov._id}, jwtSecret, {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDov)
                })

        } else {
            res.status(422).json("Not ok password")
        }
    } else {
        res.status(422).json("Not ok email")
    }
})

router.post('/logout', (req, res) => {
    res.cookie("token", "").json(true)
})

module.exports = router;