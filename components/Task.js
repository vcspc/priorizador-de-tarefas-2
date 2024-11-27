import { useState } from 'react'
import { FiTrash, FiPlus } from 'react-icons/fi'

export default function Task({ task, categories, onUpdate, onDelete, onAddSubtask }) {
  const [showSubtaskInput, setShowSubtaskInput] = useState(false)

  return (
    <div className={`p-4 border rounded-lg dark:border-gray-700 ${categories[task.category].color}`}>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onUpdate(task.id, { completed: e.target.checked })}
          className="h-5 w-5"
        />
        <input
          type="text"
          value={task.title}
          onChange={(e) => onUpdate(task.id, { title: e.target.value })}
          className="flex-1 bg-transparent"
        />
        <select
          value={task.category}
          onChange={(e) => onUpdate(task.id, { category: e.target.value })}
          className="p-1 rounded dark:bg-gray-800"
        >
          {Object.entries(categories).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <button
          onClick={() => setShowSubtaskInput(!showSubtaskInput)}
          className="p-2 hover:bg-white/20 rounded"
        >
          <FiPlus />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 hover:bg-white/20 rounded text-red-500"
        >
          <FiTrash />
        </button>
      </div>

      {showSubtaskInput && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const title = e.target.subtask.value.trim()
            if (title) {
              onAddSubtask(task.id, title)
              e.target.reset()
              setShowSubtaskInput(false)
            }
          }}
          className="mt-2 ml-8"
        >
          <input
            name="subtask"
            type="text"
            placeholder="Add subtask..."
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          />
        </form>
      )}

      {task.subtasks.length > 0 && (
        <div className="ml-8 mt-2 space-y-2">
          {task.subtasks.map(subtask => (
            <div key={subtask.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={(e) => {
                  const updatedSubtasks = task.subtasks.map(st =>
                    st.id === subtask.id ? { ...st, completed: e.target.checked } : st
                  )
                  onUpdate(task.id, { subtasks: updatedSubtasks })
                }}
              />
              <span className={subtask.completed ? 'line-through' : ''}>
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
