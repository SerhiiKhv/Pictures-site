import {useState} from "react";

export const MorePhotos = ({place, setShowAllPhotos}) => {

    const [index, setIndex] = useState(0)

    if (index > place.photos.length - 1) {
        setIndex(0)
    }

    if (index < 0) {
        setIndex(place.photos.length - 1)
    }

    function activePhoto(photo, indexPhoto) {
        let className = "rounded-2xl p-2 w-full h-32 aspect-square object-cover"

        if(index === indexPhoto){
            className = "rounded-2xl p-2 w-full  bg-gray-200 shadow shadow-black h-32 aspect-square object-cover"
        }

        return (
            <img src={"http://localhost:4000/uploads" + photo}
                 className={className} alt="Loading..."/>
        )

    }

    return (
        <div className="absolute inset-0 bg-white w-full">
            <h2 className="text-3xl fixed left-10">Photos of {place.title}</h2>
            <div className="p-8 grid h-full grid-cols-[5fr_1fr] gap-4">
                <div className="relative">
                    <button onClick={() => setIndex((prev) => prev + 1)}
                            className="absolute top-1/2 right-5 flex gap-1
                          bg-gray-200 shadow shadow-black p-2 rounded-2xl transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                        </svg>
                    </button>

                    <img src={"http://localhost:4000/uploads" + place.photos[index]}
                         className="p-2 h-90vh w-full aspect-square object-cover" alt="Loading..."/>

                    <button onClick={() => setIndex((prev) => prev - 1)}
                            className="absolute top-1/2 left-5 flex gap-1 bg-gray-200
                            shadow shadow-black p-2 rounded-2xl transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                        </svg>
                    </button>

                </div>
                <div className="overflow-y-auto h-90vh">
                    {place.photos.length > 0 && place.photos.map((photo, indexPhoto) => (
                        <div key={photo}>
                            {activePhoto(photo, indexPhoto)}
                        </div>
                    ))}
                </div>
            </div>

            <button className="fixed right-1 flex gap-1 top-1 bg-gray-200
                    shadow shadow-black p-2 rounded-2xl" onClick={() => setShowAllPhotos(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>

        </div>
    )
}