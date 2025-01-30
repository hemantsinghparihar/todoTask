import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setFilterReducer } from '../features/TodoSlice'; 

const FilterData = () => {
    const dispatch=useDispatch();
    const [filter,setFilter]=useState('')

    dispatch(setFilterReducer(filter))
  return (
    <div>
        <select name="" id="" onChange={(e)=>{setFilter(e.target.value)}}>  
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
        </select>
      
    </div>
  )
}

export default FilterData
