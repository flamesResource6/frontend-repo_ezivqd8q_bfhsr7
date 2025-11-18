import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import NoteList from './components/NoteList'
import Editor from './components/Editor'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [folders, setFolders] = useState([])
  const [notes, setNotes] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  const [currentNote, setCurrentNote] = useState(null)
  const [query, setQuery] = useState('')

  const filteredNotes = useMemo(() => {
    let list = [...notes]
    if (currentFolder) {
      list = list.filter(n => n.folder_id === currentFolder.id)
    }
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(n => (`${n.title} ${n.content}`.toLowerCase().includes(q)))
    }
    // Pinned first
    return list.sort((a, b) => Number(b.pinned) - Number(a.pinned))
  }, [notes, currentFolder, query])

  const loadData = async () => {
    const [fRes, nRes] = await Promise.all([
      fetch(`${API_BASE}/api/folders`).then(r => r.json()),
      fetch(`${API_BASE}/api/notes`).then(r => r.json())
    ])
    setFolders(fRes.items || [])
    setNotes(nRes.items || [])
  }

  useEffect(() => {
    loadData()
  }, [])

  const createFolder = async () => {
    const name = prompt('Folder name')
    if (!name) return
    const res = await fetch(`${API_BASE}/api/folders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    if (res.ok) loadData()
  }

  const createNote = async () => {
    const res = await fetch(`${API_BASE}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Untitled', content: '', folder_id: currentFolder?.id || null })
    })
    if (res.ok) loadData()
  }

  const deleteFolder = async (folder) => {
    if (!confirm('Delete folder? Make sure it is empty.')) return
    const res = await fetch(`${API_BASE}/api/folders/${folder.id}`, { method: 'DELETE' })
    if (res.ok) {
      setCurrentFolder(null)
      loadData()
    } else {
      const err = await res.json().catch(() => ({}))
      alert(err.detail || 'Failed to delete folder')
    }
  }

  const deleteNote = async (note) => {
    if (!confirm('Delete this note?')) return
    const res = await fetch(`${API_BASE}/api/notes/${note.id}`, { method: 'DELETE' })
    if (res.ok) {
      setCurrentNote(null)
      loadData()
    }
  }

  const togglePin = async (note) => {
    await fetch(`${API_BASE}/api/notes/${note.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinned: !note.pinned })
    })
    loadData()
  }

  const updateNote = async (patch) => {
    if (!currentNote) return
    const updated = { ...currentNote, ...patch }
    setCurrentNote(updated)
    // Optimistic UI
    setNotes(prev => prev.map(n => n.id === currentNote.id ? updated : n))
    await fetch(`${API_BASE}/api/notes/${currentNote.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    })
  }

  return (
    <div className="min-h-screen h-screen grid grid-rows-[auto,1fr] bg-white dark:bg-slate-950">
      <Header
        onNewNote={createNote}
        onNewFolder={createFolder}
        onSearch={setQuery}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="grid grid-cols-[16rem,20rem,1fr] h-full">
        <Sidebar
          folders={folders}
          currentFolder={currentFolder}
          onSelect={setCurrentFolder}
          onDelete={deleteFolder}
        />
        <NoteList
          notes={filteredNotes}
          currentNote={currentNote}
          onSelect={setCurrentNote}
          onDelete={deleteNote}
          onTogglePin={togglePin}
        />
        <Editor
          note={currentNote}
          onChange={updateNote}
        />
      </div>
    </div>
  )
}
