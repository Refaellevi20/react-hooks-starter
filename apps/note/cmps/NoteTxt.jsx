export function NoteTxt({ note }) {
    return (
      <div className="note-txt">
        <h1> {note.info.txt || 'No content'}</h1>
      </div>)
  }
  