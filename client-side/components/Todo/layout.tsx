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
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const getTodos = async ()=>{
        try {
            const response = await axios.get("/api/todo");
            setTodos(response.data);
          } catch (error) {
            console.error("Failed to fetch todos:", error);
          }
    }

    const handleBulkDelete = async (selectedOnly: boolean) => {
        try {
          const idsToDelete = selectedOnly ? selectedIds : todos.map(todo => todo._id)
          await axios.post("/api/todo/bulkDelete", { ids: idsToDelete })
          getTodos() // Refresh the list
          setSelectedIds([]) // Clear selection
        } catch (error) {
          console.error("Failed to delete todos:", error)
        }
      }
    
      const handleBulkComplete = async (selectedOnly: boolean) => {
        try {
          const idsToComplete = selectedOnly ? selectedIds : todos.map(todo => todo._id)
          await axios.post("/api/todo/bulkComplete", { ids: idsToComplete })
          getTodos() // Refresh the list
          setSelectedIds([]) // Clear selection
        } catch (error) {
          console.error("Failed to complete todos:", error)
        }
      }

    useEffect(()=>{
        getTodos();
    }, [])
    
  return (
    <div className='centered-card sm:w-[30%] min-w-[420px] w-full mx-auto p-small'>
      <Input type='text' placeholder='🔍 Search Todo by Title'/>
      <div className='w-full flex justify-end gap-1 my-2'>
            <Button>Hide Completed</Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Bulk Action</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={() => handleBulkDelete(false)}>DELETE ALL</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkDelete(false)}>COMPLETE ALL</DropdownMenuItem>
                    {selectedIds.length > 0 ? (
                    <>
                        <DropdownMenuItem onClick={() => handleBulkDelete(true)}>
                            DELETE SELECTED 
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkComplete(true)}>
                            COMPLETE SELECTED 
                        </DropdownMenuItem>
                    </>)
                    : null}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      <TodoList todos={todos} 
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}/>
    </div>
  )
}

export default Todo
