import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, editNote, removeNote, addNote }) {
    console.log("Notes in NoteList:", notes)


    const divideNotes = () => {
        const pinned = []
        const unpinned = []
        for (const note of notes) {
            if (note.isPinned) {
                pinned.push(note)
            } else {
                unpinned.push(note)
            }

        }
        return { pinned, unpinned }
    }
    const { pinned, unpinned } = divideNotes()
    return (
        <div>
            {pinned && pinned.length ? <div className="memo-pined-container">
                <h3>PINNED </h3>
                {
                    pinned.map(note =>
                        <NotePreview
                            key={note.id}
                            note={note} type={note.type} editNote={editNote} removeNote={removeNote} addNote={addNote} />
                    )
                }
            </div> : null}
            <div className="memo-container">
            <h3>OTHERS </h3>
                {  
                    unpinned && unpinned.length ? unpinned.map(note =>
                        <NotePreview
                            key={note.id}
                            note={note} 
                            type={note.type} 
                            editNote={editNote} 
                            removeNote={removeNote} 
                            addNote={addNote} />
                    ) : null
                }
            </div>
        </div>

    )
}

