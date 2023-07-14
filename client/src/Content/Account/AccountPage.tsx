import {Link, Navigate, NavLink, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../../UserContext";
import axios from "axios";
import {PlacePage} from "./Pages/PlacePage";

export const AccountPage = () => {

    const [redirect, setRedirect] = useState('')
    const {ready, user, setUser} = useContext(UserContext)
    let {subpage} = useParams()

    async function logout() {
        await axios.post("/logout")
        setRedirect('/')
        setUser(null)
    }

    function linkClasses(type = null) {
        let classes = 'px-4 py-2 flex flex-inline rounded-full'
        if (type === subpage) {
            classes += ' bg-pacificblue text-white'
        }else {
            classes += ' bg-gray-200'
        }
        return classes
    }

    if (subpage === undefined) {
        subpage = 'profile';
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

    return (
        <div>
            <nav className='w-full flex gap-2 mt-8 justify-center py-2'>
                <Link to={'/account/profile'} className={linkClasses('profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    My profile
                </Link>

                <Link to={'/account/bookings'} className={linkClasses('bookings')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    My bookings
                </Link>

                <Link to={'/account/places'} className={linkClasses('places')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                    My accommodation
                </Link>
            </nav>

            {subpage === 'profile' && (
                <div className='text-center max-w-sm mx-auto py-6'>
                    <p className="py-1">Logged in as {user.name} ({user.email})</p><br/>
                    <button onClick={logout} className='bg-pacificblue text-white rounded-full p-2 w-full'>Logout
                    </button>
                </div>
            )}

            {subpage === 'places' && (
                <div>
                   <PlacePage />
                </div>
            )}
        </div>
    )
}