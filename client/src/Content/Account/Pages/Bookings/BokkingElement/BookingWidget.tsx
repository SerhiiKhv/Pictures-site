import React, {useState} from "react";
import {differenceInCalendarDays} from "date-fns/fp";
import axios from "axios";
import {Button} from "../../../../../components/button/Button";
import {Navigate} from "react-router-dom";

export const BookingWidget = ({place}) => {

    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [numberGuests, setNumberGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)
    const [bookingId, setBookingId] = useState()

    let numberOfDays = 0
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkIn), new Date(checkOut))
    }

    async function bookThisPlace() {
        const response = await axios.post("/booking", {
            checkIn, checkOut, name, phone, numberGuests,
            place: place._id,
            price: numberOfDays * place.price,
        })

        setBookingId(response.data._id)
        setRedirect(true)
    }

    if(redirect){
        return <Navigate to={`/account/bookings/${bookingId}`} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div>
                <div className="text-center text-2xl">
                    Price: ${place.price} / per night
                </div>

                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4">
                            <label>Check-in: </label>
                            <input value={checkIn} type="date"
                                   onChange={(e) => setCheckIn(e.target.value)}/>
                        </div>

                        <div className="py-3 px-4 border-l">
                            <label>Check-out: </label>
                            <input type="date" value={checkOut}
                                   onChange={(e) => setCheckOut(e.target.value)}/>
                        </div>
                    </div>

                    <div className="py-3 px-4 border-t">
                        <label>Number of guests: </label>
                        <input className="border p-2 rounded-2xl w-full" type="number"
                               value={numberGuests}
                               onChange={(e) => setNumberGuests(e.target.value)}/>
                    </div>
                </div>

                {numberOfDays > 0 && (
                    <div>
                        <div>
                            <label>Your full name: </label>
                            <input className="border p-2 rounded-2xl w-full"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div>
                            <label>Phone number: </label>
                            <input className="border p-2 rounded-2xl w-full"
                                   value={phone}
                                   onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                    </div>
                )}

                <div className="py-4">
                    <Button onClick={bookThisPlace}
                                   disabled={!name || !phone || numberOfDays < 0}
                                   className="px-2 bg-pacificblue text-white rounded-2xl w-full py-2">
                        Book this place
                        {numberOfDays > 0 && (
                            <span> ${numberOfDays * place.price}</span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}