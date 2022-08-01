import React from 'react'

const Table = ({ columns, rows, format }) => {   
  return (
    <table>
     <thead>
        <tr>
          {columns.map(column => 
            <th>{column.name}</th>
          )}
        </tr>
      </thead>

      <tbody>
        {rows.map(row => // array of routes object (airline, src, dest)
          <tr>
            {columns.map(column => 
              <td>{format(column.property, row[column.property])}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table