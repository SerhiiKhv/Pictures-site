import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import notImage from "../../../../assets/notImage.webp"
import {PlacesApi} from "../../../../api/Api";

export const PlaceList = () => {
    const [place, setPlace] = useState([])

    useEffect(() => {
        PlacesApi.getUserPlaces().then(({data}) => {
            setPlace(data)
        })
    }, [])

    function checkDescriptionLength(description) {
        let maxLength = window.innerWidth >= 768 ? 700 : 80;
        if (description.length >= maxLength) {
            return description.slice(0, maxLength) + "...";
        }
        return description;
    }

    return(
        <div className="py-4">
            {place.length > 0? place.map(place => (
                <Link key={place._id} to={"/account/places/new/" + place._id} className="cursor-pointer bg-gray-200 gap-2 flex rounded-2xl p-4">
                    <div className="flex w-32 h-32 shrink-0">
                        {place.photos[0]? (
                            <img src={"http://localhost:4000/uploads" + place.photos[0]}
                                 className="rounded-2xl w-full" alt="Loading..."/>
                        ) : (
                            <img src={notImage}
                                 className="rounded-2xl w-full" alt="Loading..."/>
                        )}

                    </div>
                    <div className='grow-0 shrink'>
                        <h2 className="text-xl">{place.title}</h2>
                        <p className="text-sm mt-2">{checkDescriptionLength(place.description)}</p>
                    </div>
                </Link>
            )) :
                <div>You not have place</div>}
        </div>
    )
}