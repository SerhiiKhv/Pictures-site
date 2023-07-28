const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectId, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    price: Number
})

const bookingSchema = mongoose.model('Booking', BookingSchema)

module.exports = bookingSchema