import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {AddressLink} from "../Place/ElementPlace/AddressLink";
import {PhotosLink} from "../Place/ElementPlace/PhotosLink";
import {differenceInCalendarDays} from "date-fns/fp";
import {format} from "date-fns";
import {MorePhotos} from "../Place/ElementPlace/MorePhotos";
import {AccountNav} from "../../AccountNav";

export const BookingPage = () => {

    const {id} = useParams()

    const [booking, setBooking] = useState()
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    useEffect(() => {
        if (id) {
            axios.get(`booking/` + id).then(res => {
                    setBooking(res.data)
                }
            )
        }
    }, [id])

    if (!booking) {
        return ""
    }

    return (
        <div>
            {!showAllPhotos? (
                <div>
                    <AccountNav/>
                    <div className="mt-8 px-8 ">
                        <h1 className="text-2xl font-bold">{booking.place.title}</h1>
                        <AddressLink place={booking.place}/>
                    </div>

                    <div className="bg-gray-100 px-4">
                        <div className="grid grid-cols-[10fr_1fr] p-4">
                            <div>
                                <h2 className="text-xl font-semibold">Your booking information:</h2>
                                <div className="flex">
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
                                        </svg>

                                        {differenceInCalendarDays(new Date(booking.checkIn), new Date(booking.checkOut))} night

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/>
                                        </svg>
                                        {format(new Date(booking.checkIn), 'yyyy-MM-dd')}

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/>
                                        </svg>
                                        {format(new Date(booking.checkOut), 'yyyy-MM-dd')}

                                    </div>
                                </div>
                            </div>

                            <div className="p-4 w-32 text-center bg-pacificblue text-white rounded-2xl">
                                <div>Total price</div>
                                <div>${booking.price}</div>
                            </div>
                        </div>

                        <div className="py-3">
                            <PhotosLink place={booking.place} setShowAllPhotos={setShowAllPhotos}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <MorePhotos place={booking.place} setShowAllPhotos={setShowAllPhotos}/>
                </div>
            )}
        </div>

    )
}