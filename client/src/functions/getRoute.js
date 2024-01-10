const getRoute = async (directionsService, travelMode, trashBinsArg) => {
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371;
        var dLat = deg2rad(lat2-lat1);
        var dLon = deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }
      
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    let waypt = [];
    let trashBins = [...trashBinsArg];
    const length = trashBins.length;
    let pos = -1;

    for (let i = 0; i < length; ++i) {
        let closest = -1, closestValue;
        // eslint-disable-next-line
        trashBins.forEach((trashBin, index) => {
            let tempRes;
            if (i === 0) {
                tempRes = getDistanceFromLatLonInKm(44.524018, 18.642677, trashBin.lat, trashBin.lng);
            } else {
                tempRes = getDistanceFromLatLonInKm(waypt[pos].lat, waypt[pos].lng, trashBin.lat, trashBin.lng);
            }
            if (closest === -1) {
                closest = index;
                closestValue = tempRes;
            } else if (tempRes < closestValue) {
                closest = index;
                closestValue = tempRes;
            }
        });
        if (trashBins[closest].readyForPickup === "Y") {
            waypt.push(trashBins[closest]);
            ++pos;
        }
        trashBins.splice(closest, 1);
    }
    console.log(waypt);
    const realWaypts = waypt.map((way) => {
        return {
            location: {
                lat: way.lat,
                lng: way.lng
            },
            stopover: true
        };
    });
    const result = await directionsService.route({
        origin: {
            lat: 44.524018,
            lng: 18.642677
        },
        waypoints: realWaypts,
        destination: {lat: 44.563232, lng: 18.651057},
        travelMode
    });
    return result;
}

export default getRoute;