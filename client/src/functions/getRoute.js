const getRoute = async (directionsService, travelMode, checkpoints) => {
    const result = await directionsService.route({
        origin: {
            lat: 44.524018,
            lng: 18.642677
        },
        destination: {lat: 44.563232, lng: 18.651057},
        travelMode
    });
    return result;
}

export default getRoute;