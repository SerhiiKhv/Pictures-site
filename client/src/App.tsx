import './App.css'
import {Layout} from "./Layout";
import {Route, Routes} from "react-router-dom";
import {IndexPage} from "./Content/IndexPage";
import {LoginPage} from "./LoginPage/LoginPage";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import {useEffect} from "react";
import {AccountPage} from "./Content/Account/AccountPage";

axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.withCredentials = true

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<IndexPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/account/' element={<AccountPage/>}/>
                    <Route path='/account/:subpage?' element={<AccountPage/>}/>
                    <Route path='/account/:subpage/:action' element={<AccountPage/>}/>
                    <Route path='/account/:subpage/:action/:id' element={<AccountPage/>}/>
                </Route>
            </Routes>
        </UserContextProvider>
    )
}

export default App
