import React, { Component } from 'react';
import './App.css';
import data from './data'
import { Table } from 'react-bootstrap'

const App = () => (
  <div className="app container">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <Table striped>
      <tbody>
        {data.routes.map(route => 
          <tr>
            <td>{data.getAirlineById(route.airline).name}</td>
            <td>{data.getAirportByCode(route.src).name}</td>
            <td>{data.getAirportByCode(route.dest).name}</td>
          </tr>
        )}
      </tbody>
    </Table>
  </section>
</div>
)

export default App;