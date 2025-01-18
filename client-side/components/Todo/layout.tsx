"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import axios from 'axios'
import TodoList from './TodoList'
import { TodoInterface } from '@/lib/interfaces'
import { Button } from '../ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu'

const ITEMS_PER_PAGE = 5 // Adjust this number as needed

const Todo = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showAll, setShowAll] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter todos based on completion status and search term
  const filteredTodos = todos
    .filter(todo => showAll ? true : !todo.completed)
    .filter(todo => 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  // Calculate pagination values
  const totalItems = filteredTodos.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentTodos = filteredTodos.slice(startIndex, endIndex)

  const getTodos = async () => {
    try {
      const response = await axios.get("/api/todo")
      setTodos(response.data)
    } catch (error) {
      console.error("Failed to fetch todos:", error)
    }
  }

  const handleBulkDelete = async (selectedOnly: boolean) => {
    try {
      const idsToDelete = selectedOnly ? selectedIds : todos.map(todo => todo._id)
      await axios.post("/api/todo/bulkDelete", { ids: idsToDelete })
      getTodos()
      setSelectedIds([])
    } catch (error) {
      console.error("Failed to delete todos:", error)
    }
  }

  const handleBulkComplete = async (selectedOnly: boolean) => {
    try {
      const idsToComplete = selectedOnly ? selectedIds : todos.map(todo => todo._id)
      await axios.post("/api/todo/bulkComplete", { ids: idsToComplete })
      getTodos()
      setSelectedIds([])
    } catch (error) {
      console.error("Failed to complete todos:", error)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedIds([]) // Clear selections when changing pages
  }

  useEffect(() => {
    getTodos()
  }, [])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [showAll, searchTerm])

  return (
    <div className='centered-card sm:w-[30%] min-w-[420px] w-full mx-auto p-small'>
      <Input 
        type='text' 
        placeholder='🔍 Search Todo by Title'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      
      <div className='w-full flex justify-end gap-1 my-2'>
        <Button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Hide Completed" : "Show All"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Bulk Action</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => handleBulkDelete(false)}>
              DELETE ALL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkComplete(false)}>
              COMPLETE ALL
            </DropdownMenuItem>
            {selectedIds.length > 0 && (
              <>
                <DropdownMenuItem onClick={() => handleBulkDelete(true)}>
                  DELETE SELECTED
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkComplete(true)}>
                  COMPLETE SELECTED
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TodoList 
        todos={currentTodos}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1
              // Show first page, last page, and pages around current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              return null
            })}

            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default Todo