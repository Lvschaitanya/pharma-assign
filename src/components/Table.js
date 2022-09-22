import React, { useState } from 'react'
import TableData from './TableData'
import './Table.css'
import Pagination from './Pagination'

const Table = ({filterByInput, selectedBatch, setSelectedBatch}) => {

    let codes = []
    let dataByCode = []
    let batch = []
    let dataByBatch = []
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10

    filterByInput.forEach(value=>{
        if(!codes.includes(value.code)){
          codes.push(value.code)
        }
        if(!batch.includes(value.batch)){
            batch.push(value.batch)
        }
    })

    if(selectedBatch){
      const filteredDataByBatch = filterByInput.filter(obj=>obj.batch===selectedBatch)
      let name
      let stock =0
      let deal = Infinity
      let free = Infinity
      let mrp =0
      let rate =0
      let exp = new Date()
      const updatedData ={}

      filteredDataByBatch.forEach(value=>{
        name = value.name
        stock= stock + parseInt(value.stock)
        if(deal>value.deal){
          deal = value.deal
        }
        if(free>value.free){
          free = value.free
        }
        if(mrp<value.mrp){
          mrp = value.mrp
        }
        if(rate<value.rate){
          rate = value.rate
        }
        const d= value.exp.split('/')
        const currentDate = new Date( d[2], (d[1]-1), d[0] )
        // console.log(currentDate)
        if(exp>currentDate){
          exp = currentDate
        }
        
      })

      updatedData['name']=name
      updatedData['batch'] = selectedBatch
      updatedData['stock']=stock
      updatedData['deal']=deal
      updatedData['free']=free
      updatedData['mrp']=mrp
      updatedData['rate']=rate
      updatedData['exp']=exp.toLocaleDateString()
      dataByBatch.push(updatedData)
    }

    codes.forEach(value=>{
      const filteredDataByCode = filterByInput.filter(obj=>obj.code===value)
      let name 
      let stock = 0
      let deal = Infinity
      let free = Infinity
      let mrp = 0
      let rate = 0
      let exp = new Date()
      const updatedData = {}
      filteredDataByCode.forEach(value=>{
        name = value.name
        stock= stock + parseInt(value.stock)
        if(deal>value.deal){
          deal = value.deal
        }
        if(free>value.free){
          free = value.free
        }
        if(mrp<value.mrp){
          mrp = value.mrp
        }
        if(rate<value.rate){
          rate = value.rate
        }
        const d= value.exp.split('/')
        const currentDate = new Date( d[2], (d[1]-1), d[0] )
        if(exp>currentDate){
          exp = currentDate
        }
      })
      updatedData['name']=name
      updatedData['batch']= 'All'
      updatedData['stock']=stock
      updatedData['deal']=deal
      updatedData['free']=free
      updatedData['mrp']=mrp
      updatedData['rate']=rate
      updatedData['exp']=exp.toLocaleDateString()
      dataByCode.push(updatedData)
    })


    const updateSelector = () => {
      const select = document.getElementById('selector')
      const opt = select.options[select.selectedIndex]
      setSelectedBatch(opt.value)
    }

    const paginate = (number) => setCurrentPage(number)

    const paginateData =() =>{
      const lastIndex = currentPage * perPage
      const firstIndex = lastIndex - perPage
      const slicedValues = dataByCode.slice(firstIndex,lastIndex)
      return (
        <div>
          <TableData data = {slicedValues} />
          <Pagination perPage = {perPage} total={dataByCode.length} paginate= {paginate}/>
        </div>
      )
    }


  return (
    <div className='info'>

      <select id='selector' className='selector' onChange={updateSelector}>
        <option value='' >Select Batch</option>
        {batch.map(value=>(
          <option key={value} value={value}>{value}</option>
        ))}
      </select>

      {!selectedBatch ?

        (
          dataByCode.length===0 ? <div>no data found</div> : (
            dataByCode.length<=10 ? 
            <TableData data={dataByCode} />
            : 
            paginateData()
          )
        )

        :
        
        <TableData data={dataByBatch} />
        
        
    }      
    </div>
  )
}

export default Table