import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption }
import "../App.css";
import axios from "axios";


// const axios = require('axios');

// var config = {
//     method: 'get',
//     url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}%20BC&mode=bicycling&language=fr-FR&key=YOUR_API_KEY`,
//     headers: {}
// };

// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });


export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

    if (!isLoaded) return <div>Loading.......</div>;
    return <Map />;
}

function Map() {
    const [origin, setOrigin] = useState('')
    const [destination, setdestination] = useState('')

    const center = useMemo(() => ({ lat: 44, lng: -80 }), [])
    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName='map-container' />
    );
}
