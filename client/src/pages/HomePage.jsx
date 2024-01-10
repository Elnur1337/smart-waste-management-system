import React, { useState, useRef } from "react";

//Components
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import Alerts from "../components/Alerts";
import MapControls from "../components/MapControls";

export const directionsContext = React.createContext();

const HomePage = () => {
    //States
    const [trashBins, setTrashBins] = useState([]);
    const [realTrashBins, setRealTrashBins] = useState([]);
    const [directionsRoute, setDirectionsRoute] = useState(null);

    //Refs
    const directionsService = useRef(null);
    const drivingTravelMode = useRef(null);

    return (
        <>
            <Navbar/>
            <directionsContext.Provider value={[directionsRoute, setDirectionsRoute, directionsService, drivingTravelMode, trashBins, setTrashBins, realTrashBins, setRealTrashBins]}>
                <Alerts/>
                <Map/>
                <MapControls/>
            </directionsContext.Provider>
        </>
    );
}

export default HomePage;