//Libraries
import { useState, useEffect, useRef } from 'react';
import {useJsApiLoader, GoogleMap, Marker, InfoWindow, DirectionsRenderer} from '@react-google-maps/api';
import io from 'socket.io-client';

//Functions
import scale from '../functions/scale'
import getRoute from '../functions/getRoute';
import getData from '../functions/getData';

//Trash Bin Icons
import trashBinRed from '../assets/trashBinRed.png';
import trashBinYellow from '../assets/trashBinYellow.png';
import trashBinGreen from '../assets/trashBinGreen.png';

const socket = io.connect('http://localhost:3001');

const Map = () => {
    //Google maps API variables
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    //Refs
    const mapCenter = useRef({lat: 44.537471, lng: 18.673469});

    //States
    const [trashBins, setTrashBins] = useState([]);
    const [selectedTrashBin, setSelectedTrashBin] = useState(null);
    const [directionsRoute, setDirectionsRoute] = useState(null);

    useEffect(() => {
        (async function() {setTrashBins(await getData('/getTrashBins'))}());
    }, []);

    return isLoaded ? (
        <section className="map">
            <GoogleMap
                center = {mapCenter.current}
                zoom = {15}
                mapContainerStyle = {{width: '100%', height: '100%'}}
                options = {{mapId: "aa4a901015cd4d1a", mapTypeControl: false, streetViewControl: false, fullscreenControl: false}}
                clickableIcons = {false}
                onLoad={async (map) => {
                    const directionsService = new window.google.maps.DirectionsService();
                    setDirectionsRoute(await getRoute(directionsService, window.google.maps.TravelMode.DRIVING, mapCenter.current));
                }}>
                {/* DO OVDJE SAM DOSO DA FIXANJEM KODA */}
                {trashBins ? trashBins.map((trashBin) => {
                    const position = {
                        lat: trashBin.lat,
                        lng: trashBin.lon
                    }
                    if (trashBin.readyForPickup === 'Y') {
                        return (
                            <Marker
                                key={trashBin.id}
                                position={position}
                                icon={{url: trashBinRed, scaledSize: {width: 30, height: 30}}}
                                onClick={() => {setSelectedTrashBin(trashBin)}}>
                            </Marker>
                        );
                    } else if (trashBin.distance < 50) {
                        return (
                            <Marker
                                key={trashBin.id}
                                position={position}
                                icon={{url: trashBinYellow, scaledSize: {width: 30, height: 30}}}
                                onClick={() => {setSelectedTrashBin(trashBin)}}>
                            </Marker>
                        );
                    } else {
                        return (
                            <Marker
                                key={trashBin.id}
                                position={position}
                                icon={{url: trashBinGreen, scaledSize: {width: 30, height: 30}}}
                                onClick={() => {setSelectedTrashBin(trashBin)}}>
                            </Marker>
                        );
                    }
                }) : <></>}
                {selectedTrashBin && 
                <InfoWindow
                    position={{
                        lat: selectedTrashBin.lat,
                        lng: selectedTrashBin.lon
                    }}
                    onCloseClick={() => {setSelectedTrashBin(null)}}>
                        <h3 className='infoWindowPercent'>{scale(Math.floor(selectedTrashBin.distance), 100, 0, 0, 100)}% full</h3>
                </InfoWindow>}
                {directionsRoute && <DirectionsRenderer directions={directionsRoute}/>}
            </GoogleMap>
        </section>
    ) : <></>;
}

export default Map;