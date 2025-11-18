import { useState } from 'react'
import { Search, Plus, FolderPlus, Moon, Sun } from 'lucide-react'

export default function Header({ onNewNote, onNewFolder, onSearch, theme, setTheme }) {
  const [query, setQuery] = useState('')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onSearch(e.target.value)
          }}
          placeholder="Search notes..."
          className="bg-transparent outline-none w-full text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400"
        />
      </div>
      <button
        onClick={onNewFolder}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm"
      >
        <FolderPlus className="w-4 h-4" />
        New Folder
      </button>
      <button
        onClick={onNewNote}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
      >
        <Plus className="w-4 h-4" />
        New Note
      </button>
      <button
        onClick={toggleTheme}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  )
}
