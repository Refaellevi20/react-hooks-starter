// const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx";

export function BookList({notes, onRemoveNote, onSelectNoteId}){

    return(
        <ul className="note-list clean">
            {notes.map(note =>
                <li key={note.id}>
                    <section>
                    <button onClick={() => onRemoveBook(note.id)}>Remove</button>
                    </section>
                </li>
            )}
        </ul>
    )
}