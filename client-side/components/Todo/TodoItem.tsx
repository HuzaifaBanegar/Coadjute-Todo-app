import React, { useEffect, useState } from "react";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TodoInterface } from "@/lib/interfaces";
import { Checkbox } from "../ui/checkbox";

interface TodoItemProps {
    item: TodoInterface
    isSelected: boolean
    onSelect: (checked: boolean) => void
  }

const TodoItem: React.FC<TodoItemProps> = ({ item, isSelected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
  
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
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
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
