export function NoteTxt({ note }) {
    return (
      <div className="note-txt">
        <p> {note.info.txt || 'No content'}</p>
      </div>)
  }
  