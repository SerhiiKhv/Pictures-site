import {useState} from "react";

export const PhotosLink = ({place}) => {

    const [showAllPhotos, setShowAllPhotos] = useState(false)

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
                        <div key={photo.id}>
                            <img src={"http://localhost:4000/uploads" + photo}
                                 className="p-2 w-full h-full" alt="Loading..."/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return(
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
    )
}