import React from 'react'
import './TableData.css'

const TableData = ({data}) => {
  return (
    <div className='main'>
        <table className='table'>
        <tr className='header'>
          <th>Name</th>
          <th>Batch</th>
          <th>Stock</th>
          <th>Deal</th>
          <th>Free</th>
          <th>MRP</th>
          <th>Rate</th>
          <th>Expiry</th>
        </tr>
        {data.map(value=>(
          <tr key={value.code} className='data'>
            <td>{value.name}</td>
            <td>{value.batch}</td>
            <td>{value.stock}</td>
            <td>{value.deal}</td>
            <td>{value.free}</td>
            <td>{value.mrp}</td>
            <td>{value.rate}</td>
            <td>{value.exp}</td>
          </tr>
        ))}
      </table>
      
    </div>
  )
}

export default TableData