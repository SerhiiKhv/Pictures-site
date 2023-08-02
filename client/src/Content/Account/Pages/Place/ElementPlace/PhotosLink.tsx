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

    function checkPhoto(index, className = '') {

        if (!className) {
            className = "h-80 w-full aspect-square object-cover"
        }

        return (
            <img src={"http://localhost:4000/uploads" + place.photos[index]}
                 className={className} alt="Loading..."
                 onClick={() => setShowAllPhotos(true)}/>
        )
    }

    function buttonShowMore() {
        return (
            <button className="flex gap-1 absolute bg-gray-200 rounded-2xl px-4 py-2
                            bottom-2 right-2" onClick={() => setShowAllPhotos(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                </svg>

                Show more
            </button>
        )
    }


    return (
        <div className="relative">
            <div className="">
                {place.photos.length === 1 && (
                    <div>
                        <div className="">
                            {checkPhoto(0, "h-40rem w-full object-cover object-center")}
                        </div>
                        {buttonShowMore()}
                    </div>
                )}

                {place.photos.length === 2 && (
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            {checkPhoto(0, "h-40rem w-full object-cover object-center")}
                        </div>
                        <div>
                            {checkPhoto(1, "h-40rem w-full object-cover object-center")}
                        </div>
                        {buttonShowMore()}
                    </div>
                )}

                {place.photos.length === 3 && (
                    <div className="grid grid-cols-[2fr_1fr] gap-2">
                        <div>
                            {checkPhoto(0, "h-40rem w-full object-cover object-center")}
                        </div>
                        <div>
                            <div>
                                {checkPhoto(1)}
                            </div>

                            <div className="overflow-hidden">
                                {checkPhoto(2, "relative top-2 h-80 w-full object-cover object-center")}
                            </div>
                        </div>
                        {buttonShowMore()}
                    </div>
                )}

                {place.photos.length === 4 && (
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <div>
                                {checkPhoto(0)}
                            </div>

                            <div>
                                {checkPhoto(1, "relative top-2 h-80 w-full object-cover object-center")}
                            </div>
                        </div>
                        <div>
                            <div>
                                {checkPhoto(2)}
                            </div>

                            <div>
                                {checkPhoto(3, "relative top-2 h-80 w-full object-cover object-center")}
                            </div>
                        </div>
                        {buttonShowMore()}
                    </div>
                )}


                {place.photos.length >= 5 && (
                    <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] ">
                        {checkPhoto(0, "h-40rem w-full object-cover object-center")}
                        <div>
                            <div className="grid">
                                {checkPhoto(1)}
                            </div>

                            <div className="overflow-hidden">
                                {checkPhoto(2, "relative top-2 h-80 w-full object-cover object-center")}
                            </div>
                        </div>

                        <div>
                            <div className="grid">
                                {checkPhoto(3)}
                            </div>

                            <div className="overflow-hidden">
                                {checkPhoto(4, "relative top-2 h-80 w-full object-cover object-center")}
                            </div>
                        </div>
                        {buttonShowMore()}
                    </div>
                )}
            </div>

        </div>
    )
}