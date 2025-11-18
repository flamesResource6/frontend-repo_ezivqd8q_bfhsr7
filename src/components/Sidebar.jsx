import { Folder, FolderOpen, Trash2 } from 'lucide-react'

export default function Sidebar({ folders, currentFolder, onSelect, onDelete }) {
  return (
    <div className="w-64 border-r border-slate-200 dark:border-slate-800 h-full overflow-y-auto p-3">
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2 px-2">Folders</div>
      <div className="space-y-1">
        <button
          onClick={() => onSelect(null)}
          className={`w-full flex items-center justify-between gap-2 px-2 py-2 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${currentFolder === null ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        >
          <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <FolderOpen className="w-4 h-4" /> All Notes
          </span>
        </button>
        {folders.map((f) => (
          <div key={f.id} className="flex items-center gap-2 group">
            <button
              onClick={() => onSelect(f)}
              className={`flex-1 px-2 py-2 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${currentFolder?.id === f.id ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
            >
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <Folder className="w-4 h-4" /> {f.name}
              </span>
            </button>
            <button onClick={() => onDelete(f)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-500 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
