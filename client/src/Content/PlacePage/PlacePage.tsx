import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {BookingWidget} from "./BookingWidget";

export const PlacePage = () => {

    const {id} = useParams()
    const [place, setPlace] = useState()
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get(`places/${id}`).then(res => setPlace(res.data))
    }, [id])

    if (!place) {
        return "???? not page"
    }

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen min-w-full">
                <div className="p-8 grid gap-4">
                    <h2 className="text-3xl">Photos of {place.title}</h2>

                    <button className="fixed right-12 flex gap-1 top-8 bg-gray-200
                    shadow shadow-black px-4 py-2 rounded-2xl" onClick={() => setShowAllPhotos(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>

                        Close photos
                    </button>

                </div>
                <div className="grid grid-cols-2">
                    {place.photos.length > 0 && place.photos.map(photo => (
                        <div>
                            <img src={"http://localhost:4000/uploads" + photo}
                                 className="p-2 w-full h-full" alt="Loading..."/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-8 bg-gray-100 p-8">
            <h1 className="text-2xl">{place.title}</h1>
            <a className="flex my-2 font-semibold underline" target="_blank"
               href={"https://maps.google.com/?q=" + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
                {place.address}
            </a>

            <div className="relative h-1/3">
                {place.photos[0] &&
                    <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] ">
                        <img src={"http://localhost:4000/uploads" + place.photos[0]}
                             className="aspect-square object-cover" alt="Loading..."
                             onClick={() => setShowAllPhotos(true)}/>
                        <div>
                            <div className="grid">
                                {place.photos[1] && (
                                    <img src={"http://localhost:4000/uploads" + place.photos[1]}
                                         className="aspect-square object-cover " alt="Loading..."
                                         onClick={() => setShowAllPhotos(true)}/>
                                )}
                            </div>

                            <div className="overflow-hidden">
                                {place.photos[2] && (
                                    <img src={"http://localhost:4000/uploads" + place.photos[2]}
                                         className="aspect-square object-cover relative top-2" alt="Loading..."
                                         onClick={() => setShowAllPhotos(true)}/>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="grid">
                                {place.photos[3] && (
                                    <img src={"http://localhost:4000/uploads" + place.photos[3]}
                                         className="aspect-square object-cover " alt="Loading..."
                                         onClick={() => setShowAllPhotos(true)}/>
                                )}
                            </div>

                            <div className="overflow-hidden">
                                {place.photos[4] && (
                                    <img src={"http://localhost:4000/uploads" + place.photos[4]}
                                         className="aspect-square object-cover relative top-2" alt="Loading..."
                                         onClick={() => setShowAllPhotos(true)}/>
                                )}
                            </div>
                        </div>
                        <button className="flex gap-1 absolute bg-gray-200 rounded-2xl px-4 py-2
                            bottom-2 right-2" onClick={() => setShowAllPhotos(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                            </svg>

                            Show more
                        </button>
                    </div>
                }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] py-2">
                <div>
                    <h2 className="font-semibold text-2xl">Description</h2>
                    <p>{place.description}</p>

                    <div className="py-4">
                        Check-in: {place.checkIn} <br/>
                        Check-out: {place.checkOut} <br/>
                        Max number of guests: {place.maxGuests}
                    </div>
                </div>

                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl">
                <h2 className="text-2xl font-semibold">Extra info:</h2>
                <p className="mb-4 mt-2 text-sm leading-5 text-gray-700">{place.extraInfo}</p>
            </div>
        </div>
    )
}