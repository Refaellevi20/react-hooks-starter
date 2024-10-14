export function NotePreview({ note }) {
    const noteStyle = {
        backgroundColor: note.color || '#fff',
    }

    return (
        <section className="note-preview" style={noteStyle}>
            <h2>{note.id}</h2>
            <h4>{note.type}</h4>
            <h4>{note.info ? note.info.text : 'No text available'}</h4>
        </section>
    )
}
