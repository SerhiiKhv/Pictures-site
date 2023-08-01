import {useContext, useState} from "react";
import {UserContext} from "../../../UserContext";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {AccountNav} from "../AccountNav";

export const ProfilePage = () => {

    const [redirect, setRedirect] = useState('')
    const {ready, user, setUser} = useContext(UserContext)


    async function logout() {
        await axios.post("account/logout")
        setRedirect('/')
        setUser(null)
    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user && !redirect) {
        return <Navigate to={"login"}/>
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return(
        <div>
            <AccountNav />
            <div className='text-center max-w-sm mx-auto py-6'>
                <p className="py-1">Logged in as {user.name} ({user.email})</p><br/>
                <button onClick={logout} className='bg-pacificblue text-white rounded-full p-2 w-full'>Logout
                </button>
            </div>
        </div>
    )
}