import React, { useEffect, useState } from 'react'
import './App.css'
import data from './data'
import Table from './components/Table'
import Select from './components/Select'

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
  const [isFiltered, setIsFiltered] = useState(false)
  const [filteredAirlines, setFilteredAirlines] = useState(data.airlines)
  const [filteredAirports, setFilteredAirports] = useState(data.airports)
  const [selectedAirline, setSelectedAirline] = useState('')
  const [selectedAirport, setSelectedAirport] = useState('')
  const PER_PAGE = 25;

  useEffect(() => {
    if (selectedAirline && selectedAirport) { // both selections change
      setRoutes(data.routes.filter(route => { // filtered airlines and airports only if selections change
        return route.airline === selectedAirline &&
        (route.dest === selectedAirport || route.src === selectedAirport)
      }))

      setIsFiltered(true)
    } else if (selectedAirline) {
      setRoutes(data.routes.filter(route => {
        return route.airline === selectedAirline
      }))

      setIsFiltered(true)
    } else if (selectedAirport) {
      setRoutes(data.routes.filter(route => {
        return route.src === selectedAirport || route.dest === selectedAirport
      }))

      setIsFiltered(true)
    } else {
      setRoutes(data.routes)
      setIsFiltered(false)
    }
  }, [selectedAirline, selectedAirport])

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
    setSelectedAirline(parseInt(event.target.value, 10))

    if (selectedAirline) {  // id of airline
      setRoutes(routes.filter(route => route.airline === parseInt(selectedAirline, 10)))
      setFilteredAirlines(filteredAirlines.map(airline => {
        if (airline.id === selectedAirline) {
          return {...airline, disabled: false}
        } else {
          return {...airline, disabled: true}
        }
      }))
      setIsFiltered(true)
    } else {
      setRoutes(data.routes)
      setFilteredAirlines(data.airlines)
      setIsFiltered(false)
    }
  }

  const filterByAirport = event => {
    setSelectedAirport(event.target.value)
    
    // if (selectedAirport) {
    //   setIsFiltered(true)
    //   setRoutes(routes.filter(route => route.src === selectedAirport || route.dest === selectedAirport))
      
    //   const airportCodes = routes.map(route => [route.src, route.dest]).flat();
    //   airportCodes = [...new Set(airportCodes)]

    //   setFilteredAirports(filteredAirports.map(airport => {
    //     if (airportCodes.includes(airport.code)) {
    //       return {...airport, disabled: false}
    //     } else {
    //       return {...airport, disabled: true}
    //     }
    //   }))
    // } else {
    //   setIsFiltered(false)
    //   setRoutes(data.routes)
    // }
  }
 
  const resetFilters = event => {
    event.preventDefault()
    setIsFiltered(false)
    setRoutes(data.routes)
    setFilteredAirlines(data.airlines)
    setFilteredAirports(data.airports)
    setSelectedAirline('')
    setSelectedAirport('')
    document.getElementById('form').reset()
  }

  return (
    <>
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>

      <section>
        <form id="form">
          <label>
            Show Routes On: 
            <Select 
              allTitle="All Airlines" 
              valueKey="id" 
              titleKey="name" 
              onSelect={filterByAirline} 
              options={data.airlines} 
              value={selectedAirline}
            />
          </label>

          <label>
            Flying in and out of: 
            <Select 
              allTitle="All Airports" 
              valueKey="code" 
              titleKey="name" 
              onSelect={filterByAirport} 
              options={data.airports} 
              value={selectedAirport} // what we want to select
            />
          </label>
            <button disabled={!isFiltered} onClick={resetFilters}>Show All Routes</button>
          </form>
        </section>

        <section>
          <Table className="routes-table" columns={columns} rows={routes} format={formatValue} perPage={PER_PAGE} firstRow={firstRouteToShow} />
        </section>

        <p>{`Showing ${firstRouteToShow + 1} - ${topOfRange()} of ${routes.length} routes`}</p>
        <button disabled={firstRouteToShow === 0 ? true : false } onClick={previousRoutes}>Previous Page</button>
        <button disabled={firstRouteToShow + PER_PAGE >= routes.length ? true : false} onClick={nextRoutes}>Next Page</button>
    </>
  )
}

export default App