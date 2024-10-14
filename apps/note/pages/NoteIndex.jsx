import { noteService } from "../services/note.service.js"
import { NoteList } from  "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

const {useState, useEffect} = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() =>{
        loadNotes()
    }, [filterBy])

    function loadNotes(){
        noteService.query(filterBy)
        .then(setNotes)
        .catch(err => {
            console.log('err:', err)
        })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
            })
            .catch(err => {
                console.log('Problems removing note:', err)
            })
    }

    function onSelectNoteId(noteId) {
        setSelectedNoteId(noteId)
    }

    

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <h2>list of notes</h2>
            <div>
                {notes.map(note => 
                    <div key={note.id}>
                        {note.info.txt}
                       
                        <button onClick={() => onRemoveNote(note.id)} >🗑</button>
                    </div>
                )}
            </div>
        </section>
    )

}

