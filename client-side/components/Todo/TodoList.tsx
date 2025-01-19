import React from 'react'
import { TodoArray } from '@/lib/interfaces'
import { Accordion } from '../ui/accordion'
import TodoItem from './TodoItem'
import NoTodo from './NoTodo'
interface TodoListProps extends TodoArray {
    selectedIds: string[]
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
  }
const TodoList : React.FC<TodoListProps> =({todos, selectedIds, setSelectedIds }) => {
  return (
    <div>
        
       {todos.length ==0 ? <NoTodo/> :
       <Accordion type="single" collapsible className="sm:min-w-[560px] w-full min-w-[400px]">
        {
            todos.map((todo)=>(
                <TodoItem key={todo._id} 
                    item={todo}
                    isSelected={selectedIds.includes(todo._id)}
                    onSelect={(checked) => {
                    setSelectedIds(prev => 
                        checked 
                        ? [...prev, todo._id]
                        : prev.filter(id => id !== todo._id)
                    )
                    }}/>
            ))
        }
        </Accordion>}
    </div>
  )
}

export default TodoList
