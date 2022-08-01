import React from 'react'

const Select = ({ allTitle, onSelect, options, valueKey, titleKey, value }) => {
 return (
  <select onChange={onSelect} name="airline" id="airline-select">
    <option key="all" value="">All Airlines</option>

    {options.map(option => 
      <option key={option[valueKey]} value={option[valueKey]}>{option[titleKey]}</option>  
    )}
  </select>
 )
}
export default Select
