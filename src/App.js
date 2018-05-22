import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import MaterialFilterTable from "./MaterialFilterTable";
import ThreatMap from "./ThreatMap";
import DataStore from "./DataStore";
import DataListWrapper from "./DataListWrapper";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

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

        const { classes } = this.props;

        return (
            this.state.dataLoaded &&
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            US Threat Map
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <TextField
                            error
                            id="search"
                            label="Search By State: "
                            type="search"
                            className={classes.textField}
                            onChange={this._onFilterChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ThreatMap markers={this.state.filteredDataList.getAll()}/>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialFilterTable filteredDataList={this.state.filteredDataList.getAll()}/>
                    </Grid>
                </Grid>
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
            if (state.toLowerCase().startsWith(filterBy)) {
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

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
