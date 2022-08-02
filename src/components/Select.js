import React from 'react'

const Select = ({ allTitle, onSelect, options, valueKey, titleKey, value }) => {
 return (
  <select onChange={onSelect} value={value}>
    <option key="all" value="">{allTitle}</option>

    {options.map(option => 
      <option 
        disabled={option.disabled} 
        key={option[valueKey]} 
        value={option[valueKey]}
      >

      {option[titleKey]}
      </option>  
    )}
  </select>
 )
}
export default Select
