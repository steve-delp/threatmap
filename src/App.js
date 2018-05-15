import React, {Component} from 'react';
import './css/App.css';
import './css/fixed-data-table.css';
import FilterableTable from "./FilterableTable";
import ThreatMap from "./ThreatMap";
import DataStore from "./DataStore";
import DataListWrapper from "./DataListWrapper";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataList: new DataStore([]),
            filteredDataList: new DataListWrapper([], new DataStore([])),
            dataLoaded: false
        };

        this._onFilterChange = this._onFilterChange.bind(this);
    }

    render() {

        const searchBoxStyle = {
            color: "#333",
            fontFamily: "monospace",
            fontSize: 18,
            textAlign: "left",
            width: 750
        };
        const headerStyle = {
            textAlign: "center"
        }

        return (
            this.state.dataLoaded &&
            <div className="App container">
                <header>
                    <h1 style={headerStyle}>US Ransomware Sites</h1>
                    <h4><b>Filter By State</b></h4>
                    <input style={searchBoxStyle}
                           onChange={this._onFilterChange}
                           placeholder="Enter state"
                    />
                    <br/>
                    <br/>
                    <ThreatMap markers={this.state.filteredDataList.getAll()}/>
                    <br/>
                    <FilterableTable filteredDataList={this.state.filteredDataList}/>
                </header>
            </div>
        );
    }

    /***
     * GETs the sites from the service
     */
    getDataFromService() {
        const myInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        let serverUrl = process.env.REACT_APP_THREATMAP_SERVER_URL || "http://porterddog.com:35788"
        const myRequest = new Request(serverUrl + '/ransomwareSites', myInit);

        fetch(myRequest).then(function (response) {
            return response.json();
        }).then(responseJson => {
            console.log("json: " + responseJson.length);
            let cache = [];
            for (let i = 0; i < responseJson.length; i++) {
                cache.push({
                    id: i,
                    state: responseJson[i].county,
                    lat: responseJson[i].lat,
                    lon: responseJson[i].lon,
                    ip: responseJson[i].ip,
                    malware: responseJson[i].malware,
                });
            }
            cache = new DataStore(cache);
            // setting state here to share data between the filtered table and map components
            this.setState({
                dataList: cache,
                filteredDataList: new DataListWrapper(Array.from(Array(cache.size).keys()), cache),
                dataLoaded: true
            });
        }).catch(error => console.log("Error fetching data from server." + error));
    }

    /***
     * Filters data contained in the data store based on user input
     */
    _onFilterChange(event) {
        if (!event.target.value) {
            this.setState({
                filteredDataList: this.state.dataList,
            });
        }

        const filterBy = event.target.value.toLowerCase();
        const size = this.state.dataList.getSize();
        const filteredIndexes = [];
        for (let index = 0; index < size; index++) {
            const {state} = this.state.dataList.getObjectAt(index);
            if (state.toLowerCase().indexOf(filterBy) !== -1) {
                filteredIndexes.push(index);
            }
        }

        this.setState({
            filteredDataList: new DataListWrapper(filteredIndexes, this.state.dataList),
        });
    }

    /**
     * Loads the table and map after they have been mounted
     */
    componentDidMount() {
        this.getDataFromService();
    }
}

export default App;
