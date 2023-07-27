import {useEffect, useState} from "react";
import axios from "axios";
import notImage from "../assets/notImage.webp"
import {Link} from "react-router-dom";

export const IndexPage = () => {

    const [place, setPlace] = useState([])

    useEffect(() => {
        axios.get('places').then(res => setPlace(res.data))
    }, [])

    return (
        <div className="px-3 py-3 mt-8 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {place.length > 0 && (place.map(place => (
                    <Link to={'/place/' + place._id} key={place._id}>
                        <div className="bg-gray-500 mb-2 flex rounded-2xl">
                            {place.photos?.[0]? (
                                <img className="rounded-2xl object-cover aspect-square"
                                     src={'http://localhost:4000/uploads/' + place.photos[0]} alt="Loading..."/>
                            ): (
                                <img className="rounded-2xl object-cover aspect-square"
                                     src={notImage} alt="Loading..."/>
                            )}
                        </div>

                        <h2 className="font-bold">{place.address}</h2>
                        <h3 className="text-sm text-gray-500">{place.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span> fer night
                        </div>

                    </Link>
                ))
            )}
        </div>
    )
}