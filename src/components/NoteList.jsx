import { Pin, Trash2 } from 'lucide-react'

export default function NoteList({ notes, onSelect, currentNote, onDelete, onTogglePin }) {
  return (
    <div className="w-80 border-r border-slate-200 dark:border-slate-800 h-full overflow-y-auto p-3">
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2 px-2">Notes</div>
      <div className="space-y-1">
        {notes.map((n) => (
          <div key={n.id} className={`group rounded-lg overflow-hidden border ${currentNote?.id === n.id ? 'border-blue-500' : 'border-transparent'}`}>
            <button
              onClick={() => onSelect(n)}
              className={`w-full text-left px-3 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800`}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-800 dark:text-slate-100 truncate">{n.title || 'Untitled'}</div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); onTogglePin(n) }} className={`p-1 rounded ${n.pinned ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}>
                    <Pin className="w-4 h-4" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onDelete(n) }} className="p-1 rounded text-slate-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {n.content && (
                <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1" dangerouslySetInnerHTML={{ __html: n.content.substring(0, 120) }} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
