import './App.css'
import {Layout} from "./Layout";
import {Route, Routes} from "react-router-dom";
import {IndexPage} from "./Content/IndexPage";
import {LoginPage} from "./LoginPage/LoginPage";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import {AccountPage} from "./Content/Account/AccountPage";
import {BookingsPage} from "./Content/Account/Pages/Bookings/BookingsPage";
import {ProfilePage} from "./Content/Account/Pages/ProfilePage";
import {PlacePageAccount} from "./Content/Account/Pages/Place/PlacePageAccount";
import {PlaceFrom} from "./Content/Account/Pages/Place/Form/PlaceFrom";
import {PlacePage} from "./Content/Account/Pages/Place/PlacePage";
import {BookingPage} from "./Content/Account/Pages/Bookings/BookingPage";

axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.withCredentials = true

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<IndexPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/account' element={<AccountPage/>}/>

                    <Route path='/account/profile' element={<ProfilePage/>}/>

                    <Route path='/account/places' element={<PlacePageAccount/>}/>
                    <Route path='/account/places/new' element={<PlaceFrom/>}/>
                    <Route path='/account/places/new/:id' element={<PlaceFrom/>}/>

                    <Route path='/account/bookings' element={<BookingsPage/>}/>
                    <Route path='/account/bookings/:id' element={<BookingPage/>}/>

                    <Route path='/place/:id' element={<PlacePage/>}/>

                </Route>
            </Routes>
        </UserContextProvider>
    )
}

export default App
