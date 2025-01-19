import React, { useEffect, useState } from "react";
import { TodoInterface } from "@/lib/interfaces";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Check, ChevronDown, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ToastAction } from "../ui/toast";
import TodoDialog from "../Dialog";
import { useRouter } from "next/navigation";

interface TodoItemProps {
    item: TodoInterface
    isSelected: boolean
    onSelect: (checked: boolean) => void
  }

const TodoItem: React.FC<TodoItemProps> = ({ item, isSelected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { toast } = useToast()


    const handleMarkCompleted = async (_id: string)=>{
        
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/todos/${_id}`,
                {
                    completed: true
                }
              );

              if (response.status >= 200 && response.status < 300) {
                window.location.reload();
              }
            } catch (error) {
              console.error("Error editing todo:", error);
              toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to edit todo. Please try again.",
              });
        };

    }

    const handleEditTodo = async (data: TodoInterface, method: string) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/todos/${data._id}`,
                {
                  title: data.title,
                  description: data.description,
                }
              );
          
              // Handle success
              if (response.status >= 200 && response.status < 300) {
                toast({
                  title: data.title,
                  description: data.description,
                  action: (
                    <ToastAction altText="Edited Todo Successfully">Undo</ToastAction>
                  ),
                });
                setIsModalOpen(false);
                window.location.reload();
              }
            } catch (error) {
              console.error("Error editing todo:", error);
              toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to edit todo. Please try again.",
              });
        };
    }
  
    useEffect(() => {
      setMounted(true)
    }, [])
  
    const handleCheckboxChange = (checked: boolean | "indeterminate") => {
      onSelect(checked as boolean)
    }
  
    const handleAccordionClick = () => {
      setIsOpen(!isOpen)
    }
  
    if (!mounted) {
      return null
    }
  
    return (
      <div
        className={`p-small border rounded-1 mb-2 overflow-hidden transition-colors duration-200 w-full ${
          isSelected
            ? "bg-primary-300"
            : item.completed
            ? "bg-primary-100"
            : "bg-primary-400"
        } ${
          isSelected
            ? item.completed
              ? "text-primary-200 line-through"
              : "text-primary-200"
            : item.completed
            ? "text-primary-400 line-through"
            : "text-primary-300"
        }`}
      >
        <TodoDialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            todo={item}
            onSubmit={handleEditTodo}
        />
        <div
          onClick={handleAccordionClick}
          className="sm:p-4 p-2 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              id={item._id}
              checked={isSelected}
              onCheckedChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
            />
            <label
              htmlFor={item._id}
              className="sm:text-desktop-medium text-mobile-medium font-medium leading-none select-none items-center"
            >
              {item.title}
              {item.completed ? <button
                disabled
                className="text-mobile-small ml-1 p-1 text-primary-100 bg-primary-400"
              >
                 COMPLETED 
              </button>: null}
            </label>
          </div>

          <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Edit size={20}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>{
                    handleMarkCompleted(item._id)
                }}><Check size={20}/><span>MARK COMPLETED</span></DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{
                    setIsModalOpen(true);
                }}><Edit size={20}/><span>EDIT TODO</span></DropdownMenuItem>
            </DropdownMenuContent>
           
          </DropdownMenu>
          
            <Trash size={20}/>
            <ChevronDown size={20}/>
          </div>
        </div>
        <div
          className={`transition-all duration-200 ${
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t text-justify">{item.description}</div>
        </div>
        
      </div>
  );
};

export default TodoItem;
