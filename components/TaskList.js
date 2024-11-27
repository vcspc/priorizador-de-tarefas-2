import { useState, useEffect } from 'react'
import Task from './Task'

const CATEGORIES = {
  'important-urgent': { label: 'Importante e Urgente', weight: 3, color: 'bg-red-100 dark:bg-red-900' },
  'urgent': { label: 'Urgente', weight: 2, color: 'bg-orange-100 dark:bg-orange-900' },
  'important': { label: 'Importante', weight: 1, color: 'bg-yellow-100 dark:bg-yellow-900' },
  'normal': { label: 'Normal', weight: 0, color: 'bg-green-100 dark:bg-green-900' }
}

export default function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) setTasks(JSON.parse(savedTasks))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      category: 'normal',
      completed: false,
      subtasks: [],
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const addSubtask = (taskId, subtaskTitle) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [...task.subtasks, {
            id: Date.now(),
            title: subtaskTitle,
            completed: false
          }]
        }
      }
      return task
    }))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    return CATEGORIES[b.category].weight - CATEGORIES[a.category].weight
  })

  return (
    <div className="space-y-4">
      <form onSubmit={(e) => {
        e.preventDefault()
        const title = e.target.task.value.trim()
        if (title) {
          addTask(title)
          e.target.reset()
        }
      }}>
        <input
          name="task"
          type="text"
          placeholder="Adicionar nova tarefa..."
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        />
      </form>
      {sortedTasks.map(task => (
        <Task
          key={task.id}
          task={task}
          categories={CATEGORIES}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onAddSubtask={addSubtask}
        />
      ))}
    </div>
  )
}
