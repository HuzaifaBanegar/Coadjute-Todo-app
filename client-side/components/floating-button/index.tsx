"use client"

import React, { useState } from 'react';
import TodoDialog from '../Dialog';
import { TodoInterface } from '@/lib/interfaces';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast()

  const handleSubmit = async (data: TodoInterface, method: string) => {
    try {
      const response = await axios.post("/api/todo/addTodo", data);
      if (response.status >= 200 && response.status < 300) {
        toast({
            title: data.title,
            description: data.description,
            action: (
              <ToastAction altText="Added Todo Succesfully">Undo</ToastAction>
            ),
          })
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <TodoDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
      <button
        onClick={() => setIsOpen(true)}
        className="fixed sm:bottom-10 sm:right-10 bottom-2 right-2 flex items-center justify-center rounded-full bg-gray-900 text-white transition-transform hover:scale-105 active:scale-95 sm:h-[120px] sm:w-[120px] h-[80px] w-[80px]"
      >
        <Plus className="lg:h-12 lg:w-12 h-8 w-8" />
      </button>
    </>
  );
};

export default FloatingActionButton;