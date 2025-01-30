import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import List from './components/List'
import FilterData from './components/FilterData'

function App() {
  

  return (
    
     <div className="main">

      <section className='add-form '>
        <Form/>
      </section>

      <div className="filter-section">
        <FilterData/>
      </div>

      <section className='list-section'>
        <List/>
      </section>


     </div>
    
  )
}

export default App
