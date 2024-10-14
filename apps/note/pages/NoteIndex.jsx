import { noteService } from "../services/note.service.js" 
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(err => {
                console.log('Error loading notes:', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                console.log(`Note with ID: ${noteId} removed`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
            })
    }

    function onEditNote(updatedNote) {
        noteService.editColor(updatedNote)
            .then(() => {
                console.log(`Note with ID: ${updatedNote.id} edited`)
                setNotes(notes => notes.map(note => (note.id === updatedNote.id ? updatedNote : note)))
            })
            .catch(err => {
                console.log('Problems editing note:', err)
            })
    }

    function onAddNote(newNote) {
        noteService.add(newNote)
            .then(() => {
                setNotes(notes => [...notes, newNote])
                console.log(`New note added: ${JSON.stringify(newNote)}`)
            })
            .catch(err => {
                console.log('Problems adding note:', err)
            })
    }

    if (loading) return <div>Loading...</div>

    return (
        <section className="note-index">
            <h2>List of Notes</h2>
            <NoteList 
                notes={notes} 
                removeNote={onRemoveNote} 
                editNote={onEditNote} 
                addNote={onAddNote} 
            />
        </section>
    )
}