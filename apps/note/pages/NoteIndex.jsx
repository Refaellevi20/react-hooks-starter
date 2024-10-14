import { noteService } from "../services/note.service.js"
const {useState, useEffect} = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() =>{
        loadNotes()
    }, [filterBy])

    function loadNotes(){
        noteService.query(filterBy)
        .then(setBooks)
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
                showSuccessMsg('Note removed successfully')
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Problems removing note (${noteId})`)
            })
    }

    
    return (
        <section className="app-note">
            <h2>list of notes</h2>
            <ul>
                {notes.map(note => 
                    <li key={note.id}>
                        {note.type}
                        <button onClick={() => onRemoveNote(note.id)} >x</button>
                    </li>
                )}
            </ul>
        </section>
    )

}

