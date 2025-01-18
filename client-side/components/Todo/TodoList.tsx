import React from 'react'
import { TodoArray } from '@/lib/interfaces'
const TodoList : React.FC<TodoArray> =({todos}) => {
  return (
    <div>
      {
        todos.map((todo)=>(
            <li key={todo._id}>{todo.title}</li>
        ))
      }
    </div>
  )
}

export default TodoList
