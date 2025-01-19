"use client"

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { TodoInterface } from '@/lib/interfaces';

interface TodoDialogProps {
  open: boolean;
  onClose: () => void;
  todo?: TodoInterface;
  onSubmit: (data: TodoInterface, method: string) => void;
}

const TodoDialog = ({ open, onClose, todo, onSubmit }: TodoDialogProps) => {
  const [formData, setFormData] = useState<Omit<TodoInterface, '_id' | 'completed'> & { _id?: string ; completed?: boolean}>({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        _id: todo._id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed
      });
    } else {
      setFormData({
        title: '',
        description: '',
        completed: false
      });
    }
  }, [todo]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const method = todo ? 'PATCH' : 'POST';
    
    if (method === 'POST') {
      // For POST, only send title and description
      const postData = {
        title: formData.title,
        description: formData.description
      };
      onSubmit(postData as TodoInterface, method);
    } else {
      // For PATCH, send all fields
      const patchData: TodoInterface = {
        _id: formData._id || '',
        title: formData.title,
        description: formData.description,
        completed: formData.completed || false
      };
      onSubmit(patchData, method);
    }

    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{todo ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Add Todo"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <Textarea
              placeholder="Add Description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {todo ? 'Save Changes' : 'Add Todo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;