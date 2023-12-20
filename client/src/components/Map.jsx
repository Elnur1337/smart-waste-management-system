//Libraries
import { useState, useEffect } from 'react';
import {useJsApiLoader, GoogleMap, Marker, InfoWindow, DirectionsRenderer} from '@react-google-maps/api';
import axios from 'axios';
import io from 'socket.io-client';


//Trash Bin Icons
import trashBinRed from '../assets/trashBinRed.png';
import trashBinYellow from '../assets/trashBinYellow.png';
import trashBinGreen from '../assets/trashBinGreen.png';

const socket = io.connect('http://localhost:3001');

const Map = () => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDCP4SqRiSdvS_GqB8fH9VsnC1ACHqcOUc"
    });

    //States
    // eslint-disable-next-line
    const [mapCenter, setMapCenter] = useState({
        lat: 44.537471,
        lng: 18.673469
    });
    const [trashBins, setTrashBins] = useState([]);
    const [selectedTrashBin, setSelectedTrashBin] = useState(null);
    const [directionsRoute, setDirectionsRoute] = useState(null);


    useEffect(() => {
        const trashBinsData = async () => {
            const res = await axios.get('/getTrashBins');
            const data = res.data;
            setTrashBins(data);
        }
        trashBinsData();
    }, []);

    const scale = (number, inMin, inMax, outMin, outMax) => {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }



    return isLoaded ? (
        <section className="map">
            <GoogleMap
                center = {mapCenter}
                zoom = {15}
                mapContainerStyle = {{width: '100%', height: '100%'}}
                options = {{mapId: "aa4a901015cd4d1a", mapTypeControl: false, streetViewControl: false, fullscreenControl: false}}
                clickableIcons = {false}
                onLoad={(map) => {
                    const directionsService = new window.google.maps.DirectionsService();
                    const getRoute = async () => {
                        const result = await directionsService.route({
                                                origin: {
                                                    lat: 44.524018,
                                                    lng: 18.642677
                                                },
                                                destination: mapCenter,
                                                travelMode: window.google.maps.TravelMode.DRIVING
                                            });
                        setDirectionsRoute(result);
                    }
                    getRoute();
                }}>
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