import './App.css';
import { csv } from 'd3';
import { useEffect, useState } from 'react';
import Table from './components/Table';
import { BrowserRouter } from 'react-router-dom';
const filepath = require('./data.csv')

function App() {

  const [data,setData] =useState([])
  const [search, setSearch] = useState('')
  const [filterByInput,setFilterByInput] = useState([])
  const [display,setDisplay] = useState(false)
  const [selectedBatch,setSelectedBatch] = useState('')


  useEffect(()=>{
    csv(filepath).then(res=>{
      res.forEach(value=>(
        // console.log(value)
        setData(oldData=>[...oldData,value])
      ))
    })
  },[])

  

  const click = async (e) =>{
    e.preventDefault()
    if(search){
      setSelectedBatch('')
      if(selectedBatch){
        const select = document.getElementById('selector')
        select.selectedIndex=0
        setSelectedBatch('')
      }
      setFilterByInput(data.filter(value=>value.name.toLowerCase().startsWith(search.toLowerCase())))
      if(!display){
        setDisplay(!display)
      }
    }

  }


  return (
    <BrowserRouter>
    <div className="App">
      <form onSubmit={click}>
      <input type='text' placeholder='Enter the value' id='searchbar' value={search} onChange={(e)=>{
        setSearch(e.target.value)
        if(selectedBatch){
          // console.log('yes')
          const select = document.getElementById('selector')
          select.selectedIndex=0
          setSelectedBatch('')
        }
        setDisplay(false)
        }} />
      <button onClick={click}>search</button>
      </form>
      {display?<Table filterByInput={filterByInput} selectedBatch={selectedBatch} setSelectedBatch={setSelectedBatch} />:''}
    </div>
    </BrowserRouter>
  );
}

export default App;
