import {useState} from "react";
import {Perks} from "./Perks";
import axios from "axios";

export const PlaceFrom = () => {

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [photos, setPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)

    async function submit() {
        await axios.post("/places", {
            title, address, photos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests
        })
    }

    function inputHeader(text, description) {
        return <>
            <h2 className="text-xl">{text}</h2>
            <p className="text-gray-500 text-sm">{description}</p>
        </>
    }

    function inputText(placeholder, setType, value) {
        return <input type={"text"}
                      value={value}
                      placeholder={placeholder}
                      onChange={e => setType(e.target.value)}
                      className="p-2 w-full border border-gray-400 rounded-2xl"/>
    }

    function preInput(text: string, description: string, placeholder: string, setType, value) {
        return <>
            {inputHeader(text, description)}
            {inputText(placeholder, setType, value)}
        </>
    }



    async function addPhotoByLink(e) {
        e.preventDefault()
        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink})
        setPhotos(prev => [...prev, filename])
        setPhotoLink('')
    }

    function uploadPhotos(e){
        const files = e.target.files
        console.log({files})
        const data = new FormData()

        for(let i = 0; i < files.length; i++){
            data.append('photos', files[i])
        }

        axios.post('/upload', data, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(res => {
            const {data: filenames} = res
            setPhotos(prev => {
                return [...prev, ...filenames]
            })
        })
    }

    return (
        <>
            <form className="p-2" onSubmit={submit}>
                {preInput("Title", "This for you place, should be short and catchy as in advertisement",
                    "title, for example: My lovely apt", setTitle, title)}

                {preInput("Address", "Address to this place", "address", setAddress, address)}

                {inputHeader("Photos", "more=better")}
                <div className="flex gap-2">
                    <input type={"text"}
                           value={photoLink}
                           onChange={e => setPhotoLink(e.target.value)}
                           placeholder={"Add using a link ...jpg"}
                           className="p-2 w-full border rounded-2xl border border-gray-400"/>
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-6 rounded-2xl">Add&nbsp;photo
                    </button>
                </div>

                <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {photos.length > 0 && photos.map(link => (
                        <div className="h-32 flex" key={link}>
                            <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt={"Loading..."}/>
                        </div>
                    )) }

                    <label className="border border-gray-400 bg-transporter items-center
                        rounded-2xl p-8 text-2xl text-gray-600 flex flex-inline justify-center">
                        <input type="file" className="hidden" onChange={uploadPhotos}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/>
                        </svg>
                        Upload
                    </label>
                </div>

                {inputHeader("Description", "Description on the place")}
                <textarea value={description} onChange={e => setDescription(e.target.value)}
                          className="w-full border border-gray-400 my-1 py-2 px-3 rounded-2xl"/>

                {inputHeader("Perks", "select all the perks of you place")}
                <div className="gap-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} setPerks={setPerks}/>
                </div>

                {inputHeader("Extra info", "house rules, etc")}
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}
                          className="w-full border border-gray-400 my-1 py-2 px-3 rounded-2xl"/>

                {inputHeader("Check in&out times", "add check in and out times, remember to have some" +
                    "time window for cleaning the room between guests")}
                <div className="gap-2 grid sm:grid-cols-3">
                    <div className="py-1">
                        <h3 className="mt-2 -mb-1 py-1">Check in time</h3>
                        {inputText("12", setCheckIn, checkIn)}
                    </div>

                    <div className="py-1">
                        <h3 className="mt-2 -mb-1 py-1">Check out time</h3>
                        {inputText("24", setCheckOut, checkOut)}
                    </div>

                    <div className="py-1">
                        <h3 className="mt-2 -mb-1 py-1">Max number of guests</h3>
                        <input type="number" value={maxGuests} placeholder="1"
                               onChange={e => setMaxGuests(+e.target.value)}
                               className="p-2 w-full border border-gray-400 rounded-2xl"/>
                    </div>
                </div>

                <button className="bg-pacificblue text-white rounded-full p-2 w-full">Save</button>
            </form>
        </>
    )
}