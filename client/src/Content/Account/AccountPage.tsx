import {Link, Navigate, NavLink, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../../UserContext";
import axios from "axios";

export const AccountPage = () => {

    const [redirect, setRedirect] = useState('')
    const {ready, user, setUser} = useContext(UserContext)
    let {subpage} = useParams()

    async function logout(){
        await axios.post("/logout")
        setRedirect('/')
        setUser(null)
    }

    function linkClasses(type = null){
        let classes = 'px-4 py-2'
        if(type === subpage){
            classes += ' bg-pacificblue text-white rounded-full'
        }
        return classes
    }

    if(subpage === undefined){
        subpage = 'profile';
    }

    if(!ready){
        return 'Loading...'
    }

    if(ready && !user && !redirect){
        return <Navigate to={"login"} />
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <nav className='w-full flex gap-2 mt-8 justify-center py-2'>
                <Link to={'/account/profile'} className={linkClasses('profile')}>My profile</Link>
                <Link to={'/account/bookings'} className={linkClasses('bookings')}>My bookings</Link>
                <Link to={'/account/places'} className={linkClasses('places')}>My accommodation</Link>
            </nav>
            {subpage === 'profile' && (
                <div className='text-center max-w-sm mx-auto py-6'>
                    Logged in as {user.name} ({user.email})<br/>
                    <button onClick={logout} className='bg-pacificblue text-white rounded-full p-2 w-full'>Logout</button>
                </div>
            )}
        </div>
    )
}