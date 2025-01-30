import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux';
import { addTodo } from '../features/TodoSlice';


const Form = () => {
    const dispatch=useDispatch();
    const {register,handleSubmit,formState:{errors}}=useForm();

    const onSubmit=(data)=>{
        console.log('✌️data --->', data);
        const formData={
            id:Date.now(),
            todo:data.todo,
            status:'pending'
        }
        dispatch(addTodo(formData))

        
    }
  return (
    <div className=' p-4'>
      <form onSubmit={handleSubmit(onSubmit)} action="" className='flex  justify-center'>
        <div className="form-group flex flex-col">
            
            <input {...register('todo',{required:true})} type="text" placeholder='write your todo...' className='border border-black px-2 py-1 '  />
        </div>

        <button className='button border px-2 py-1 text-base font-medium rounded-[12px] text-white bg-blue-500'>ADD</button>

      </form>  
      
    </div>
  )
}

export default Form
