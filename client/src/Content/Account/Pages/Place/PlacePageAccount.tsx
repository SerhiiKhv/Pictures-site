import {Link, useParams} from "react-router-dom";
import {PlaceFrom} from "./Form/PlaceFrom";
import {PlaceList} from "./PlaceList";
import {AccountNav} from "../../AccountNav";

export const PlacePageAccount = () => {
    const {action} = useParams()

    return (
        <div>
            <AccountNav />

            {action !== "new" && (
                <div className="py-4">
                    <div className="text-center ">
                        <Link className="bg-pacificblue text-white py-2 px-6 rounded-full
                inline-flex gap-1" to={"/account/places/new"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>

                            Add new place
                        </Link>
                    </div>


                    <PlaceList />
                </div>
            )}
            {action === "new" && (
                <PlaceFrom />
            )}
        </div>
    )
}