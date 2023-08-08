import {useEffect, useState} from "react";
import axios from "axios";
import notImage from "../assets/notImage.webp"
import {Link, useSearchParams} from "react-router-dom";
import {Paginator} from "../components/paginator/Paginator";

export const IndexPage = () => {

    const [place, setPlace] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItemsCount, setTotalItemsCount] = useState(0)

    let [searchParams, setSearchParams] = useSearchParams();
    const currentPageParamURL = searchParams.get('page') || '1'

    let portionSize = 8

    useEffect(() => {
        axios.get(`places?page=${currentPageParamURL}&cout=${portionSize}`).then(res => {
            setPlace(res.data.places)
            setCurrentPage(res.data.currentPage)
            setTotalItemsCount(res.data.totalItems)
        })
    }, [])

    useEffect(() => {
        {
            const queryCurrentPage = String(currentPage)
            if (queryCurrentPage) searchParams.set('page', queryCurrentPage)
            setSearchParams(searchParams)
        }
    }, [currentPage])

    function onPageChanged(portionNumber: number) {
        axios.get(`places?page=${portionNumber}&cout=${portionSize}`).then(res => {
            setPlace(res.data.places)
            setCurrentPage(res.data.currentPage)
        })

    }

    return (
        <div>
            <div className="px-3 py-3 mt-8 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {place.length > 0 && (place.map(place => (
                        <Link to={'/place/' + place._id} key={place._id}>
                            <div className="bg-gray-500 mb-2 flex rounded-2xl">
                                {place.photos?.[0] ? (
                                    <img className="rounded-2xl object-cover aspect-square"
                                         src={'http://localhost:4000/uploads/' + place.photos[0]} alt="Loading..."/>
                                ) : (
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

            <div className="flex justify-center py-8">
                <Paginator totalItemsCount={totalItemsCount} portionSize={portionSize}
                           currentPage={currentPageParamURL} onPageChange={onPageChanged}/>
            </div>

        </div>
    )
}