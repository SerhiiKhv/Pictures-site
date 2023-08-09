import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BookingWidget} from "../Bookings/BokkingElement/BookingWidget";
import {AddressLink} from "./ElementPlace/AddressLink";
import {PhotosLink} from "./ElementPlace/PhotosLink";
import {MorePhotos} from "./ElementPlace/MorePhotos";
import {Perks} from "./Form/Perks";
import {PlacesApi} from "../../../../api/Api";

export const PlacePage = () => {

    const {id} = useParams()
    const [place, setPlace] = useState()
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    useEffect(() => {
        if (!id) {
            return
        }
        PlacesApi.getPlacesId(id).then(res => setPlace(res.data))
    }, [id])

    if (!place) {
        return "???? not page"
    }


    return (
        <div>
            {!showAllPhotos ? (
                <div className="mt-8 bg-gray-100 p-8">
                    <h1 className="text-2xl">{place.title}</h1>
                    <AddressLink place={place}/>

                    <div className="h-40rem">
                        <PhotosLink place={place} setShowAllPhotos={setShowAllPhotos}/>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] py-10">
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

                    <h2 className="p-4 text-2xl font-semibold">Perks: </h2>
                    <div className="gap-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <Perks selected={place.perks}/>
                    </div>
                </div>
            ) : (
                <div>
                    <MorePhotos place={place} setShowAllPhotos={setShowAllPhotos}/>
                </div>
            )}
        </div>
    )
}