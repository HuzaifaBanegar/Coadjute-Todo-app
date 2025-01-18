import React from 'react'
import { TodoArray } from '@/lib/interfaces'
import { Accordion } from '../ui/accordion'
import TodoItem from './TodoItem'
const TodoList : React.FC<TodoArray> =({todos}) => {
  return (
    <div>
        <div>

        </div>
        <Accordion type="single" collapsible className="w-full">
        {
            todos.map((todo)=>(
                <TodoItem key={todo._id} item={todo}/>
            ))
        }
        </Accordion>
    </div>
  )
}

export default TodoList
