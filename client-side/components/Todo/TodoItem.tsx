import React, { useEffect, useState } from "react";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TodoInterface } from "@/lib/interfaces";
import { Checkbox } from "../ui/checkbox";

interface TodoItemProps {
  item: TodoInterface;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Prevent hydration mismatch

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setIsChecked(checked as boolean);
  };

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`p-small border rounded-1 mb-2 overflow-hidden transition-colors duration-200 ${
        isChecked
          ? "bg-primary-300"
          : item.completed
          ? "bg-primary-100"
          : "bg-primary-400"
      } ${
        isChecked
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
        className="p-4 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          {/* Stop propagation when checkbox is clicked */}
          <Checkbox
            id={item._id}
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
          />
          <label
            htmlFor={item._id}
            className="sm:text-desktop-large text-mobile-large font-medium leading-none select-none"
          >
            {item.title}
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
