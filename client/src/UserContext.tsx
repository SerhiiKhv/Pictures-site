import {createContext, useEffect, useState} from "react";
import {AuthorizationAPi} from "./api/Api";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if(!user){
            AuthorizationAPi.GetProfile().then(({data}) => {
                setUser(data)
                setReady(true)
            })
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}