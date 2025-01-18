"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import axios from 'axios';
import TodoList from './TodoList';
import {TodoInterface} from '@/lib/interfaces';


const Todo = () => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);

    const getTodos = async ()=>{
        try {
            const response = await axios.get("http://localhost:8000/api/todos");
            setTodos(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTodos();
    }, [])
    
  return (
    <div className='centered-card sm:w-[40%] min-w-[420px] w-full mx-auto p-small'>
      <Input type='text' placeholder='🔍 Search Todo by Title'/>
      <TodoList todos={todos}/>
    </div>
  )
}

export default Todo
