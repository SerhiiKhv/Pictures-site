const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
const imageDownloader = require('image-downloader')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
const multer = require('multer')
const fs = require('fs')

const User = require('./models/user')
const Place = require('./models/place')

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'asdfghas14djhf4312adsghsdjf'

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + "/uploads"))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json("Test ok")
})

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
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

app.post('/logout', (req, res) => {
    res.cookie("token", "").json(true)
})

app.get('/profile', (req, res) => {
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
app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body
    const newName = '/photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + "/" + newName
    });

    res.json(newName)
})

const photosMiddleware = multer({dest: 'uploads/'})

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadFiles = []

    for (let i = 0; i < req.files.length; i++) {

        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadFiles.push(newPath.replace('uploads', ''))
    }

    res.json(uploadFiles)
})

app.post('/places', (req, res) => {
    const {token} = req.cookies

    const {
        title, address, photos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        })
        res.json(placeDoc)
    })
})

app.get('/user-places', (req, res) => {
    const {token} = req.cookies

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner: id}))
    })
})

app.get('/places', async (req, res) => {
        res.json(await Place.find())
})

app.get('/places/:id', async (req, res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})

app.put('/places', async (req, res) => {
    const {token} = req.cookies
    const {
        id, title, address, photos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body

   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id)

        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title, address, photos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save()
            res.json('ok')
        }
    })
})

app.listen(4000)