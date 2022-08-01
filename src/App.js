import React, { useState } from 'react'
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

const App = () => {
  const [firstRouteToShow, setFirstRouteToShow] = useState(0)
  const [routes, setRoutes] = useState(data.routes)
  const PER_PAGE = 25;

  const previousRoutes = () => {  // 26 - 50 -> 1 - 25 
    setFirstRouteToShow(firstRouteToShow - PER_PAGE)
  }
  
  const nextRoutes = () => {      // 0 - 24 -> 25 - 49 (firstRouteToShow + 25)
    setFirstRouteToShow(firstRouteToShow + PER_PAGE)
  }

  const topOfRange = () => {
    return firstRouteToShow + PER_PAGE <= routes.length ? firstRouteToShow + PER_PAGE : routes.length;
  }

  const filterByAirline = event => {
    const airlineName = event.target.value

    if (airlineName) {
      const airline = data.getAirlineByName(airlineName)
      setRoutes(data.routes.filter(route => route.airline === airline.id))
    } else {
      setRoutes(data.routes)
    }
  }

  return (
    <>
      <div className="app container">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>

        <section>
          <form>
            <label>
              Show Routes On: 
              <select onChange={filterByAirline}>
                <option key="all" value="">All Airlines</option>
                {data.airlines.map(airline => 
                  <option key={airline.id} value={airline.name}>{airline.name}</option>  
                )}
              </select>
            </label>
          </form>
        </section>

        <section>
          <Table className="routes-table" columns={columns} rows={routes} format={formatValue} perPage={PER_PAGE} firstRow={firstRouteToShow} />
        </section>

        <p>{`Showing ${firstRouteToShow + 1} - ${topOfRange()} of ${routes.length} routes`}</p>
        <button disabled={firstRouteToShow === 0 ? true : false } onClick={previousRoutes}>Previous Page</button>
        <button disabled={firstRouteToShow + PER_PAGE >= routes.length ? true : false} onClick={nextRoutes}>Next Page</button>
      </div>
    </>
  )
}

export default App