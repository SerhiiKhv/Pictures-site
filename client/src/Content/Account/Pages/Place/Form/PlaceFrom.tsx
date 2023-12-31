import React, {useEffect, useState} from "react";
import {Perks} from "./Perks";
import {Navigate, useParams} from "react-router-dom";
import {Photos} from "./Photos";
import {AccountNav} from "../../../AccountNav";
import {PlacesApi} from "../../../../../api/Api";

export const PlaceFrom = () => {
    const {id} = useParams()

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [photos, setPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(50)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (!id) {
            return
        }
        PlacesApi.getPlacesId(id).then(res => {
            const {data} = res
            setTitle(data.title)
            setAddress(data.address)
            setPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    }, [id])

    async function submit(e) {
        e.preventDefault()
        const placeData = {
            title, address, photos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price
        }

        if (id) {
            await PlacesApi.putPlaces({id, ...placeData})
        } else {
            await PlacesApi.postPlaces(placeData)
        }
        setRedirect(true)
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

    if(redirect){
        return <Navigate to={"/account/places"} />
    }

    return (
        <>
            <AccountNav/>
            <form className="p-2" onSubmit={submit}>
                {preInput("Title", "This for you place, should be short and catchy as in advertisement",
                    "title, for example: My lovely apt", setTitle, title)}

                {preInput("Address", "Address to this place", "address", setAddress, address)}

                {inputHeader("Photos", "more=better")}
                <Photos photos={photos} setPhotos={setPhotos}/>

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
                <div className="gap-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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

                    <div className="py-1">
                        <h3 className="mt-2 -mb-1 py-1">Price per night</h3>
                        <input type="number" value={price} placeholder="1"
                               onChange={e => setPrice(+e.target.value)}
                               className="p-2 w-full border border-gray-400 rounded-2xl"/>
                    </div>
                </div>

                <button className="mt-2 bg-pacificblue text-white rounded-full p-2 w-full">Save</button>
            </form>
        </>
    )
}