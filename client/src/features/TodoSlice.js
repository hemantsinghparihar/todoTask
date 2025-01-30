import { createSlice } from '@reduxjs/toolkit'

const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem("toDoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
};

const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("toDoList", JSON.stringify(todos));
};

const initialState = {
    toDoList: loadTodosFromLocalStorage(),
    filter: ''
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,

    reducers: {
        addTodo: (state, action) => {
            state.toDoList = [...state.toDoList, action.payload];
            saveTodosToLocalStorage(state.toDoList); // Save to localStorage
        },

        removeTodo: (state, action) => {
            state.toDoList = state.toDoList.filter(
                (todo) => todo.id !== action.payload
            );
            saveTodosToLocalStorage(state.toDoList); // Save to localStorage
        },

        editTodoReducer: (state, action) => {
            state.toDoList = state.toDoList.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
            saveTodosToLocalStorage(state.toDoList); // Save to localStorage
        },

        setFilterReducer: (state, action) => {
            state.filter = action.payload;
        }
    },
})

export const { addTodo, removeTodo, editTodoReducer, setFilterReducer } = todoSlice.actions;

export default todoSlice.reducer;
