import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, editTodoReducer } from '../features/TodoSlice';

const List = () => {
    const dispatch = useDispatch();
    const toDoList = useSelector((state) => state.todo.toDoList);
    const filter = useSelector((state) => state.todo.filter) || 'all';

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editText, setEditText] = useState('');
    const [currEditId, setCurrEditId] = useState(null);
    const [status, setStatus] = useState('pending');

    // Function to delete a todo
    const handleDelete = (id) => {
        dispatch(removeTodo(id));
    };

    // Filter todos
    const filteredTodos = toDoList.filter((todo) => {
        if (filter === 'all') return true;
        return todo.status === filter;
    });

    const handleEdit = (id) => {
        const editTodo = toDoList.find((todo) => todo.id === id);
        if (editTodo) {
            setEditText(editTodo.todo);
            setStatus(editTodo.status);
            setCurrEditId(id);
            setIsEditOpen(true);
        }
    };

    const submitEdit = (e) => {
        e.preventDefault();
        dispatch(editTodoReducer({
            id: currEditId,
            todo: editText,
            status: status
        }));
        setIsEditOpen(false);
    };

    return (
        <div>
            {filteredTodos.length > 0 ? (
                filteredTodos.map((one) => (
                    <div key={one.id} className='flex gap-2 m-2'>
                        <p>{one.todo}</p>
                        <button
                            onClick={() => handleDelete(one.id)}
                            className='border px-2 py-1 rounded-sm bg-red-500 text-white'
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleEdit(one.id)}
                            className='border px-2 py-1 rounded-sm bg-blue-500 text-white'
                        >
                            Edit
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center">No todos found.</p>
            )}

            {isEditOpen && (
                <div className='fixed h-screen w-screen left-0 top-0 bg-black bg-opacity-50 z-50'>
                    <div className='flex w-full h-full justify-center items-center'>
                        <form className='border border-black bg-white rounded-md w-[40%] h-[50%] flex p-2'>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className='border border-black rounded-md'
                                />
                                <select
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className='border border-black rounded-md'
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button
                                    className='border border-black text-white bg-green-500 px-2 mx-1 rounded-[12px]'
                                    onClick={submitEdit}
                                >
                                    Save
                                </button>
                                <div
                                    onClick={() => setIsEditOpen(false)}
                                    className='cursor-pointer border text-white bg-black flex max-w-[80px] justify-center my-2'
                                >
                                    Close
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
