import {Cell, Column, Table} from "fixed-data-table-2";
import React from "react";

class FilterableTable extends React.Component {

    render() {
        const {dataList} = this.props.filteredDataList;
        return (
            <div>
                <Table
                    rowHeight={50}
                    rowsCount={dataList.getSize()}
                    headerHeight={50}
                    width={750}
                    height={500}
                    {...this.props}>
                    <Column
                        columnKey="id"
                        header={<Cell>Id</Cell>}
                        cell={<TextCell data={dataList} />}
                        fixed={true}
                        width={50}
                    />
                    <Column
                        columnKey="state"
                        header={<Cell>State</Cell>}
                        cell={<TextCell data={dataList} />}
                        fixed={true}
                        width={100}
                    />
                    <Column
                        columnKey="malware"
                        header={<Cell>Malware</Cell>}
                        cell={<TextCell data={dataList} />}
                        fixed={true}
                        width={200}
                    />
                    <Column
                        columnKey="ip"
                        header={<Cell>IP</Cell>}
                        cell={<TextCell data={dataList} />}
                        fixed={true}
                        width={200}
                    />
                    <Column
                        columnKey="lat"
                        header={<Cell>Lat</Cell>}
                        cell={<TextCell data={dataList} />}
                        fixed={true}
                        width={100}
                    />
                    <Column
                        columnKey="lon"
                        header={<Cell>Lon</Cell>}
                        cell={<TextCell data={dataList} />}
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

export default FilterableTable;