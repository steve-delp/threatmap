import React, { Component } from 'react';
import './css/App.css';
import './css/fixed-data-table.css';
import FilterableTable from "./FilterableTable";

require('dotenv').config();

class App extends Component {
  render() {
    return (
      <div className="App container">
        <header>
            <FilterableTable />
        </header>
      </div>
    );
  }
}

export default App;
