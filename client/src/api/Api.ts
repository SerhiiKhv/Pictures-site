import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/',
});


export const AuthorizationAPi = {
    Login(data: LoginType) {
       return instance.post('account/login', data).then(res => res.data)
    },
    Register(data: RegisterType) {
        return instance.post('account/register', data).then(res => res.data)
    },
    Logout() {
        return instance.post('account/logout')
    },
    GetProfile(){
        return instance.get("profile")
    }
}

export const PlacesApi = {
   getPlaces(currentPageParamURL: string, portionSize: number){
       return instance.get<PlacesType>(`places?page=${currentPageParamURL}&cout=${portionSize}`)
   },
    getPlacesId(id: number){
        return instance.get(`places/${id}`)
    },
    getUserPlaces(){
        return instance.get(`/user-places`)
    },
    putPlaces(data: PlaceType){
        return instance.put("/places", data)
    },
    postPlaces(data: PlaceType){
        return instance.post("/places", data)
    },
    uploadByLink(link: string){
        return instance.post('upload/upload-by-link', link)
    },
    upload(data){
        return instance.post('upload/upload', data, {
            headers: {'Content-type': 'multipart/form-data'}
        })
    }
}

export const BookingApi = {
    getBooking(){
        return instance.get("/booking")
    },
    getBookingId(id: number){
        return instance.get(`/booking/${id}`)
    },
    postBooking(data: BookingType){
        return instance.post("/booking", data)
    }
}