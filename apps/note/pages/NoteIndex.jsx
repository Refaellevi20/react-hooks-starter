import { noteService } from "../services/note.service.js" 
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteCreator } from "../cmps/NoteCreator.jsx"
import { ColorInput } from "../cmps/ColorInput.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
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
        noteService.save(updatedNote)
            .then(() => {
                setNotes((prevNotes) => {
                    const updatedNotes = prevNotes.map(note => 
                        note.id === updatedNote.id ? updatedNote : note
                    )
                    return updatedNotes
                })
                loadNotes() 
            })
            .catch(err => {
                console.log('Problems editing note:', err)
            })
    }

    

    function onAddNote(newNote) {
        noteService.save(newNote)
            .then((savedNote) => {
                setNotes((prevNotes) => [...prevNotes, savedNote])
            })
            .catch(err => {
                console.log('Problems adding note:', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({...prevFilter, ...filterByToEdit}))
    }

    if (loading) return <div>Loading...</div>

    return (
        <section className="note-index">
            <NoteCreator addNote={onAddNote} />
            <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <NoteList 
                notes={notes} 
                removeNote={onRemoveNote} 
                editNote={onEditNote} 
                addNote={onAddNote} 
            />
            {/* <ColorInput handleColorChange={onChangeColor}/> */}
        </section>
    )

}