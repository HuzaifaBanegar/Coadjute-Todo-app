import { UserRoundSearch } from 'lucide-react'
import React from 'react'

const NoTodo = () => {
  return (
    <div className='centered-card'> 
      <UserRoundSearch size={120}/>
      <h3 className='h1-nav'>No Todos here</h3>
    </div>
  )
}

export default NoTodo
