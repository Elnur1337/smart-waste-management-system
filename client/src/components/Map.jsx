//Libraries
import {useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api';
import Icon from "../assets/dumpster-solid.svg";

const Map = () => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDCP4SqRiSdvS_GqB8fH9VsnC1ACHqcOUc"
    });

    const center = {
        lat: 44.537471,
        lng: 18.673469
    };

    if (!isLoaded) {
        console.log("Loading...");
    }
    return isLoaded ? (
        <section className="map">
            <GoogleMap
                center = {center}
                zoom = {15}
                mapContainerStyle = {{width: '100%', height: '100%'}}
                options = {{mapId: "aa4a901015cd4d1a", mapTypeControl: false, streetViewControl: false, fullscreenControl: false, }}
                clickableIcons = {false}>
                <Marker
                    position={center}
                    icon={{url: Icon, scaledSize: {width: 50, height: 50}}}>
                    
                    </Marker>
            </GoogleMap>
        </section>
    ) : <></>;
}

export default Map;