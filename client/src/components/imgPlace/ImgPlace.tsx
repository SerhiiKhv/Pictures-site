export const ImgPlace = ({place, index = 0, className = ''}) => {
    if(!place.photos[index]){
        return ""
    }

    if(!className){
        className = "object-cover"
    }

    return(
        <img src={"http://localhost:4000/uploads" + place.photos[index]}
             className={className} alt="Loading..."/>

    )
}