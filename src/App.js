import React, { Component } from 'react'
import './App.css'
import data from './data'
import Table from './components/Table'

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

function formatValue(property, value) { 
  if (property === 'airline') {
    return data.getAirlineById(value).name
  } else {
    return data.getAirportByCode(value).name
  }
}

const App = () => (
  <div className="app container">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <Table className="routes-table" columns={columns} rows={data.routes} format={formatValue} />
  </section>
</div>
)

export default App