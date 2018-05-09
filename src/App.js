import React, { Component } from 'react';
import './css/App.css';
import './css/fixed-data-table.css';
import FilterableTable from "./FilterableTable";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <FilterableTable />
        </header>
      </div>
    );
  }
}

export default App;
