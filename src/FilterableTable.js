import {Cell, Column, Table} from "fixed-data-table-2";
import React from "react";
import ThreatMap from "./ThreatMap";
import DataStore from "./DataStore";

class FilterableTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: new DataStore([]),
            filteredDataList: new DataListWrapper([], new DataStore([]))
        };
        this._onFilterChange = this._onFilterChange.bind(this);
    }

    componentDidMount() {

        const myInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const myRequest = new Request(`http://localhost:8080/ransomwareSites`, myInit);

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
            cache =  new DataStore(cache);
            this.setState({
                dataList: cache,
                filteredDataList: new DataListWrapper(Array.from(Array(cache.size).keys()), cache)
            });
        });
    }

    _onFilterChange(e) {
        if (!e.target.value) {
            this.setState({
                filteredDataList: this.state.dataList,
            });
        }

        const filterBy = e.target.value.toLowerCase();
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

    render() {

        const searchBoxStyle = {
            // padding: 10,
            // margin: 10,
            backgroundColor: "#f9fffd",
            color: "#333",
            // display: "inline-block",
            fontFamily: "monospace",
            fontSize: 18,
            textAlign: "left",
            width: 750
        };

        console.log("Render Table ....");
        const {filteredDataList} = this.state;
        console.log("filteredDataList: " + filteredDataList)
        return (
            <div>
                <br />
                <h3>Filter By State</h3>
                <input style={searchBoxStyle}
                    onChange={this._onFilterChange}
                    placeholder="Enter state name"
                />
                <br />
                <br />
                <ThreatMap markers={filteredDataList.getAll()}/>
                <br />
                <br />
                <Table
                    rowHeight={50}
                    rowsCount={filteredDataList.getSize()}
                    headerHeight={50}
                    width={750}
                    height={500}
                    {...this.props}>
                    <Column
                        columnKey="id"
                        header={<Cell>Id</Cell>}
                        cell={<TextCell data={filteredDataList} />}
                        fixed={true}
                        width={50}
                    />
                    <Column
                        columnKey="state"
                        header={<Cell>State</Cell>}
                        cell={<TextCell data={filteredDataList} />}
                        fixed={true}
                        width={100}
                    />
                    <Column
                        columnKey="malware"
                        header={<Cell>Malware</Cell>}
                        cell={<TextCell data={filteredDataList} />}
                        fixed={true}
                        width={200}
                    />
                    <Column
                        columnKey="ip"
                        header={<Cell>IP</Cell>}
                        cell={<TextCell data={filteredDataList} />}
                        fixed={true}
                        width={200}
                    />
                    <Column
                        columnKey="lat"
                        header={<Cell>Lat</Cell>}
                        cell={<TextCell data={filteredDataList} />}
                        fixed={true}
                        width={100}
                    />
                    <Column
                        columnKey="lon"
                        header={<Cell>Lon</Cell>}
                        cell={<TextCell data={filteredDataList} />}
                        fixed={true}
                        width={100}
                    />
                </Table>
            </div>
        );
    }
}

class TextCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        return (
            <Cell {...props}>
                {data.getObjectAt(rowIndex)[columnKey]}
            </Cell>
        );
    }
}

export {TextCell}

class DataListWrapper {
    constructor(indexMap, data) {
        this._indexMap = indexMap;
        this._data = data;
    }

    getSize() {
        return this._indexMap.length;
    }

    getObjectAt(index) {
        return this._data.getObjectAt(
            this._indexMap[index],
        );
    }

    getAll() {
        return this._data.getAll(this._indexMap);
    }
}

export default FilterableTable;