import { NotePreview } from "./NotePreview.jsx" 

export function NoteList({ notes, removeNote, editNote }) {
  
    function handleColorChange(event, note) {
        const color = event.target.value
        const updatedNote = { ...note, color }
        if (editNote) {
            editNote(updatedNote)
        } else {
            console.log('editNote is undefined')
        }
    }

    return (
        <ul className="note-list clean">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview note={note} />
                    <section>
                        <label htmlFor={"color" + note.id}>
                            <span className="material-symbols-outlined">palette</span>
                        </label>
                        <input
                            style={{ display: 'none' }}
                            onChange={(event) => handleColorChange(event, note)}
                            type="color"
                            name="color"
                            id={"color" + note.id}
                        />
                        <button onClick={() => removeNote(note.id)}>Remove</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}
