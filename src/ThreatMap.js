import React from 'react';
import {Gmaps, Marker} from 'react-gmaps';

// center of US
const coords = {
    lat: 42.877742,
    lng: -97.380979
};

const params = {v: '3.exp', key: 'ADD KEY HERE!!!!!!', markers: []};

class ThreatMap extends React.Component {


    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    render() {

        const locations = this.props.markers;

        function createMarker(location) {
            console.log(location);
            return <Marker lat={location.lat} lng={location.lon}/>;
        }

        if (typeof locations !== 'undefined' && typeof locations[0] !== 'undefined') {
            console.log("Render Map with markers....")
            var markers = locations.map(createMarker);
            return (
                <div>
                    <Gmaps
                        width={'750px'}
                        height={'600px'}
                        lat={locations[0].lat}
                        lng={locations[0].lon}
                        zoom={6}
                        loadingMessage={'Loading map data ...'}
                        params={params}
                        onMapCreated={this.onMapCreated}>
                        {markers}
                    </Gmaps>
                </div>
            );
        } else {
            console.log("Render Map without markers....")
            return (
                <div>
                    <Gmaps
                        width={'750px'}
                        height={'600px'}
                        lat={coords.lat}
                        lng={coords.lng}
                        zoom={4}
                        loadingMessage={'Loading ...'}
                        params={params}
                        onMapCreated={this.onMapCreated}>
                    </Gmaps>
                </div>
            );
        }
    }
};

export default ThreatMap;