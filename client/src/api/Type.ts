type LoginType = {
    email: string
    password: string
}

type RegisterType = {
    email: string
    password: string
    name: string
}

type PlaceType = {
    _id: number
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number
}

type PlacesType = {
    places: PlaceType,
    currentPage: number,
    totalItems: number
}

type BookingType = {
    place: PlaceType
    user: number
    checkIn: Date
    checkOut: Date
    name: string
    phone: string
    price: number
}