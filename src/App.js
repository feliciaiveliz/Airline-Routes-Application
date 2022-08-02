import React, { useEffect, useState } from 'react'
import './App.css'
import data from './data'
import Table from './components/Table'
import Select from './components/Select'
import Map from './components/Map'

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
  const [filteredAirlines, setFilteredAirlines] = useState(data.airlines) // based on routes
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
       
      // disable (routes won't be ready)
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
      setRoutes(data.routes) // all routes
      setIsFiltered(false)   // reset button disabled
    }
  }, [selectedAirline, selectedAirport])

  useEffect(() => {
    // diable/enable options based on what routes are available
    // routes of only one airline
    // set both filteredAirlines, filteredAirports based on data in routes
    // iterate over routes {"airline":24,"src":"DFW","dest":"XNA"}
    // create two arrays of unique airlines and unique airports in routes
    // use unique arrays to create new list of disabled/enabled airlines and airports
    // set setFilteredAirlines/Airports to final new filtered list with added attributes of disabled: true
    // pass this to Select component as filteredAirlines/Airports
    // routes: {"airline":24,"src":"DFW","dest":"XNA"}
    //         {"airline":24,"src":"DFW","dest":"FWA"}
    // uniqueAirlines = [24] 
    // uniqueAirports = ['DFW', 'XNA', 'FWA']
    // data.airlines: {"id":130,"name":"Aeroflot Russian Airlines", disabled: true}
    //                {"id":24,"name":"American Airlines", disabled: false}
    // data.airports: {"code":"YEG","name":"Edmonton International Airport","lat":53.309700012200004,"long":-113.580001831},

    let uniqueAirlines = [];
    let uniqueAirports = [];

    routes.forEach(route => {
      if (!uniqueAirlines.includes(route.airline)) {
        uniqueAirlines.push(route.airline)
      }

      if (!uniqueAirports.includes(route.src)) {
        uniqueAirports.push(route.src)
      }

      if (!uniqueAirports.includes(route.dest)) {
        uniqueAirports.push(route.dest)
      }
    })

    setFilteredAirlines(data.airlines.map(airline => {
      if (!uniqueAirlines.includes(airline.id)) {
        return {...airline, disabled: true }
      } else {
        return {...airline}
      }
    }))

    setFilteredAirports(data.airports.map(airport => {
      if (!uniqueAirports.includes(airport.code)) {
        return {...airport, disabled: true }
      } else {
        return {...airport}
      }
    }))
  }, [routes])

  const previousRoutes = () => {  // 26 - 50 -> 1 - 25 
    setFirstRouteToShow(firstRouteToShow - PER_PAGE)
  }
  
  const nextRoutes = () => {      // 0 - 24 -> 25 - 49 (firstRouteToShow + 25)
    setFirstRouteToShow(firstRouteToShow + PER_PAGE)
  }

  const topOfRange = () => {
    return firstRouteToShow + PER_PAGE <= routes.length ? firstRouteToShow + PER_PAGE : routes.length;
  }

  const selectAirline = event => {
    setSelectedAirline(parseInt(event.target.value, 10))
  }

  const selectAirport = event => {
    setSelectedAirport(event.target.value)
  }

  const resetFilters = event => {
    event.preventDefault()
    setIsFiltered(false)
    setRoutes(data.routes)
    setFilteredAirlines(data.airlines) // reset enabled/disabled airlines to default (raw data)
    setFilteredAirports(data.airports) // reset enabled/disabled airports to default (raw data)
    setSelectedAirline('')             // controls the form inputs
    setSelectedAirport('') 
  }

  return (
    <>
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      
      <section>
        <Map routes={routes} format={data.getAirportByCode} /> 
      </section>

      <section>
        <form id="form">
          <label>
            Show Routes On: 
            <Select 
              allTitle="All Airlines" 
              valueKey="id" 
              titleKey="name" 
              onSelect={selectAirline} 
              options={filteredAirlines} // pass in filtered airlines
              value={selectedAirline}
            />
          </label>

          <label>
            Flying in and out of: 
            <Select 
              allTitle="All Airports" 
              valueKey="code" 
              titleKey="name" 
              onSelect={selectAirport} 
              options={filteredAirports} // // pass in filtered airport
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