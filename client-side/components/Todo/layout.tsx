"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import axios from 'axios';
import TodoList from './TodoList';
import {TodoInterface} from '@/lib/interfaces';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';


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
    <div className='centered-card sm:w-[30%] min-w-[420px] w-full mx-auto p-small'>
      <Input type='text' placeholder='🔍 Search Todo by Title'/>
      <div className='w-full flex justify-end gap-1 my-2'>
            <Button >Hide Completed</Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Bulk Action</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>DELETE ALL</DropdownMenuItem>
                    <DropdownMenuItem>COMPLETE ALL</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      <TodoList todos={todos}/>
    </div>
  )
}

export default Todo
