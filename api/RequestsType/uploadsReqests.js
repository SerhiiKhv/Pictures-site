const express = require('express');
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const photosMiddleware = multer({dest: 'uploads/'})

const path = require('path'); // Додайте цей рядок для використання модуля path

router.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = '/photo' + Date.now() + '.jpg';
    const parentDir = path.join(__dirname, '../uploads'); // Отримання шляху до папки, що знаходиться на один рівень вище

    await imageDownloader.image({
        url: link,
        dest: path.join(parentDir, newName) // Використовуємо path.join для об'єднання шляху
    });

    res.json(newName);
});

router.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
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

module.exports = router;