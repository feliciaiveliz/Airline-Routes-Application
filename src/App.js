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
    <p>
      Welcome to Airlines App!
    </p>
  </section>
  <section>
    <Table striped>
      <tbody>
        {data.routes.map(route => 
          <tr>
            <td>{route.airline}</td>
            <td>{route.src}</td>
            <td>{route.dest}</td>
          </tr>
        )}
      </tbody>
    </Table>
  </section>
</div>
)

export default App;