import {NavLink} from "react-router-dom";

export const AccountNav = () => {
    function linkClasses(type = null) {
        let classes = 'px-4 py-2 flex flex-inline rounded-full'
        if (type === "active") {
            classes += ' bg-pacificblue text-white'
        }else {
            classes += ' bg-gray-200'
        }
        return classes
    }

    return(
        <nav className='w-full flex gap-2 mt-8 justify-center py-2'>
            <NavLink  to={'/account/profile'} className={({isActive}) =>
                isActive ? linkClasses('active') : linkClasses('noActive')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                My profile
            </NavLink >

            <NavLink  to={'/account/bookings'} className={({isActive}) =>
                isActive ? linkClasses('active') : linkClasses('noActive')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                My bookings
            </NavLink >

            <NavLink  to={'/account/places'} className={({isActive}) =>
                isActive ? linkClasses('active') : linkClasses('noActive')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
                My accommodation
            </NavLink >
        </nav>
    )
}