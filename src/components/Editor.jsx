import { useEffect, useState } from 'react'

export default function Editor({ note, onChange }) {
  const [title, setTitle] = useState(note?.title || 'Untitled')
  const [content, setContent] = useState(note?.content || '')

  useEffect(() => {
    setTitle(note?.title || 'Untitled')
    setContent(note?.content || '')
  }, [note?.id])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (note) onChange({ title, content })
    }, 400)
    return () => clearTimeout(handler)
  }, [title, content])

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        Select or create a note to start editing
      </div>
    )
  }

  return (
    <div className="flex-1 h-full flex flex-col">
      <input
        className="w-full px-5 py-4 text-2xl font-semibold bg-transparent outline-none text-slate-900 dark:text-slate-100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="flex-1 w-full px-5 pb-5 pt-2 leading-7 text-slate-800 dark:text-slate-200 bg-transparent outline-none resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing... Use markdown-like text."
      />
    </div>
  )
}
