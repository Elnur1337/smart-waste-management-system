//Libraries
import { useState, useEffect, useRef, useContext } from 'react';
import {useJsApiLoader, GoogleMap, Marker, InfoWindow, DirectionsRenderer} from '@react-google-maps/api';
import io from 'socket.io-client';

//Context
import { directionsContext } from '../pages/HomePage';

//Functions
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
    
    const [selectedTrashBin, setSelectedTrashBin] = useState(null);

    //useContext Vars
    const contextVars = useContext(directionsContext);
    const directionsRoute  = contextVars[0];
    const directionsService = contextVars[2];
    const drivingTravelMode = contextVars[3];
    const trashBins = contextVars[4];
    const setTrashBins = contextVars[5];
    const realTrashBins = contextVars[6];
    const setRealTrashBins = contextVars[7];
    
    useEffect(() => {
        (async function() {setTrashBins(await getData('/getTrashBins'))}());
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        let trashBinsFiltered = [];
        trashBins.forEach((trashBin, index) => {
            if (index === 0) {
                trashBinsFiltered.push(trashBin);
            } else {
                trashBinsFiltered.forEach((trashBinF, index) => {
                    if (trashBinF.lat === trashBin.lat && trashBinF.lng === trashBin.lng) {
                        if (!trashBinF.readyForPickup === "Y") {
                            if (trashBin.readyForPickup === "Y") {
                                trashBinF.readyForPickup = "Y";
                            }
                            if (trashBin.fillLevel > trashBinF.fillLevel) {
                                trashBinF.fillLevel = trashBin.fillLevel;
                            }
                        }
                    } else {
                        if (index === trashBinsFiltered.length - 1) {
                            trashBinsFiltered.push(trashBin);
                        }
                    }
                });
            }
        });
        setRealTrashBins(trashBinsFiltered);
        // eslint-disable-next-line
    }, [trashBins]);
    
    return isLoaded && (
        <section className='map'>
            <GoogleMap
                center = {mapCenter.current}
                zoom = {15}
                mapContainerStyle = {{width: '100%', height: '100%'}}
                options = {{mapId: "aa4a901015cd4d1a", mapTypeControl: false, streetViewControl: false, fullscreenControl: false}}
                clickableIcons = {false}
                onLoad={() => {
                    directionsService.current = new window.google.maps.DirectionsService();
                    drivingTravelMode.current = window.google.maps.TravelMode.DRIVING;
                }}
                onClick={() => {
                    if (selectedTrashBin !== null) {
                        setSelectedTrashBin(null);
                    }
                }}>
                {realTrashBins && realTrashBins.map((trashBin) => {
                    if (trashBin.readyForPickup === "Y") {
                        return (
                            <Marker
                                key={trashBin.id}
                                position={{lat: trashBin.lat, lng: trashBin.lng}}
                                icon={{url: trashBinRed, scaledSize: {width: 25, height: 25}}}
                                onClick={() => {setSelectedTrashBin(trashBin)}}>
                            </Marker>
                        );
                    } else if (trashBin.distance < 50) {
                            return (
                                <Marker
                                    key={trashBin.id}
                                    position={{lat: trashBin.lat, lng: trashBin.lng}}
                                    icon={{url: trashBinYellow, scaledSize: {width: 25, height: 25}}}
                                    onClick={() => {setSelectedTrashBin(trashBin)}}>
                                </Marker>
                            );
                        } else {
                            return (
                                <Marker
                                    key={trashBin.id}
                                    position={{lat: trashBin.lat, lng: trashBin.lng}}
                                    icon={{url: trashBinGreen, scaledSize: {width: 25, height: 25}}}
                                    onClick={() => {setSelectedTrashBin(trashBin)}}>
                                </Marker>
                            );
                        }
                })}
                {selectedTrashBin && 
                <InfoWindow
                    position={{
                        lat: selectedTrashBin.lat,
                        lng: selectedTrashBin.lng
                    }}
                    onCloseClick={() => {setSelectedTrashBin(null)}}>
                        <div>
                            <h2>{`${selectedTrashBin.address}`}</h2>
                            <h3 className='infoWindowPercent'>{`${selectedTrashBin.fillLevel}%`}</h3>
                        </div>
                </InfoWindow>}
                {directionsRoute && <DirectionsRenderer directions={directionsRoute}/>}
            </GoogleMap>
        </section>
    );
}

export default Map;