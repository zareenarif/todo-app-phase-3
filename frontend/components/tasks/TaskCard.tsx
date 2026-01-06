/**
 * TaskCard component - displays a single task with all its details.
 * Supports view mode and edit mode with inline editing.
 */

'use client';

import { useState } from 'react';
import { Task, PriorityEnum, TaskUpdate } from '@/lib/types';
import { updateTask, deleteTask, toggleTaskCompletion } from '@/lib/api';
import TaskForm from './TaskForm';
import Toast from '../common/Toast';

interface TaskCardProps {
  task: Task;
  onTaskUpdated?: () => void;
}

export default function TaskCard({ task, onTaskUpdated }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingCompletion, setIsTogglingCompletion] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Priority badge colors
  const priorityColors = {
    [PriorityEnum.HIGH]: 'bg-red-100 text-red-800',
    [PriorityEnum.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [PriorityEnum.LOW]: 'bg-green-100 text-green-800',
  };

  // Format due date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Check if task is overdue
  const isOverdue = task.due_date && !task.completed && new Date(task.due_date) < new Date();

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    if (onTaskUpdated) {
      onTaskUpdated();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      if (onTaskUpdated) {
        onTaskUpdated();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task. Please try again.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleToggleCompletion = async () => {
    if (isTogglingCompletion) return; // Prevent double-click

    setIsTogglingCompletion(true);
    try {
      await toggleTaskCompletion(task.id);
      setSuccessMessage(task.completed ? 'Task marked as incomplete' : 'Task completed!');
      setShowSuccessToast(true);
      if (onTaskUpdated) {
        onTaskUpdated();
      }
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setIsTogglingCompletion(false);
    }
  };

  // If editing, show the task form
  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Task</h3>
        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description || undefined,
            priority: task.priority || undefined,
            tags: task.tags,
            due_date: task.due_date || undefined,
            recurrence: task.recurrence || undefined,
          }}
          mode="edit"
          taskId={task.id}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  // View mode
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border-l-4 ${
      task.completed
        ? 'border-green-500 bg-gradient-to-r from-green-50 to-white'
        : isOverdue
        ? 'border-red-500 bg-gradient-to-r from-red-50 to-white'
        : 'border-indigo-500 bg-white hover:border-indigo-600'
    }`}>
      <div className="flex items-start gap-3">
        {/* Completion status checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleCompletion}
            disabled={isTogglingCompletion}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Task content */}
        <div className="flex-grow min-w-0">
          {/* Title */}
          <h3 className={`text-xl font-bold ${
            task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>

          {/* Description */}
          {task.description && (
            <p className={`mt-1 text-sm ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}

          {/* Metadata: Priority, Tags, Due Date */}
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            {/* Priority badge */}
            {task.priority && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                priorityColors[task.priority]
              }`}>
                {task.priority.toUpperCase()}
              </span>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && task.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}

            {/* Due date */}
            {task.due_date && (
              <span className={`inline-flex items-center text-xs ${
                isOverdue
                  ? 'text-red-600 font-semibold'
                  : task.completed
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}>
                📅 {formatDate(task.due_date)}
                {isOverdue && ' (Overdue)'}
              </span>
            )}

            {/* Recurrence indicator */}
            {task.recurrence && (
              <span className="inline-flex items-center text-xs text-gray-500">
                🔄 {task.recurrence}
              </span>
            )}
          </div>

          {/* Timestamps */}
          <div className="mt-2 text-xs text-gray-400">
            Created {new Date(task.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg transition-all duration-200 border-2 border-indigo-600"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 text-sm font-bold text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 border-2 border-red-600"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 m-4 transform scale-100 animate-fade-in">
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">🗑️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Delete Task?
              </h3>
              <p className="text-gray-600 text-lg">
                Are you sure you want to delete <strong>"{task.title}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <Toast
          message={successMessage}
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </div>
  );
}
