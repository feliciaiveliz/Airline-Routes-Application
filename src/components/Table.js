import React from 'react'

const Table = ({ columns, rows, format, perPage, firstRow }) => {   // routes
  return (
    <table>
     <thead>
        <tr>
          {columns.map(column => 
            <th key={column.name}>{column.name}</th>
          )}
        </tr>
      </thead>

      <tbody>
        {rows.slice(firstRow, firstRow + perPage).map(row => // array of routes object (airline, src, dest)
          <tr key={columns.map(column => row[column.property]).join('')}>
            {columns.map(column => 
              <td key={column.property}>{format(column.property, row[column.property])}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table