import React from 'react';
import {Gmaps, Marker} from 'react-gmaps';

// google maps API key
const key = process.env.REACT_APP_GOOGLE_API_KEY || "AIzaSyAE6SYzw5UHNrgn0yRNL3FPqMgWmnBlpY8";
const params = {v: '3.exp', key: key, markers: []};

// coords of the center of the US
const centerUS = {lat: 42.877742, lng: -97.380979};

class ThreatMap extends React.Component {

    render() {

        // this is how data is shared between the table and the map
        const locations = this.props.markers;

        function createMarker(location, index) {
            return <Marker key={index} lat={location.lat} lng={location.lon}/>;
        }

        // set defaults to the center of the US if no state has been selected
        let lat = centerUS.lat;
        let lon = centerUS.lng;
        let zoom = 4;
        let markers = [];

        // if the data has been filtered
        if (typeof locations !== 'undefined' && typeof locations[0] !== 'undefined') {
            markers = locations.map(createMarker);
            lat = locations[0].lat;  // center on the first site in the list
            lon = locations[0].lon;
            zoom = 6;
        }

        return (
            <div>
                <Gmaps
                    width={'750px'}
                    height={'600px'}
                    lat={lat}
                    lng={lon}
                    zoom={zoom}
                    loadingMessage={'Loading map data ...'}
                    params={params}
                    onMapCreated={this.onMapCreated}>
                    {markers}
                </Gmaps>
            </div>
        );
    }
}

export default ThreatMap;