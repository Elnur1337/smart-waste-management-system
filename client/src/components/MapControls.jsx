import { useContext } from "react";

//Context
import { directionsContext } from "../pages/HomePage";

//Functions
import getRoute from "../functions/getRoute";

const MapControls = () => {
    const contextVars = useContext(directionsContext);
    const setDirectionsRoute = contextVars[1];
    const directionsService = contextVars[2];
    const drivingTravelMode = contextVars[3];
    const trashBins = contextVars[6];

    return (
        <>
            <button className="getRouteBtn" onClick={async () => {setDirectionsRoute(await getRoute(directionsService.current, drivingTravelMode.current, trashBins))}}>Generate route</button>
        </>
    );
}

export default MapControls;