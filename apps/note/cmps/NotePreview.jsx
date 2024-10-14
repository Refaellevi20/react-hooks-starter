
export function NotePreview({ note }) {

    return (
        <article className="note-preview">
            <h2>  {note.id}</h2>
            <h4> {note.type}</h4>
            <h4> {note.info.text}</h4> 
        </article>
    )

}