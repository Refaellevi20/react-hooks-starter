
const { useState } = React

import { noteService } from "../services/note.service.js"


const PLACEHOLDER = {
    'NoteImg': 'Enter image url',
    'NoteVid': 'Enter video url',
    'NoteTodos': 'Enter comma-separated todos',
    'NoteTxt' : 'Take a note...'
}

export function NoteCreator({ addNote }) {
    const [noteType, setNoteType] = useState('NoteTxt')

    function handleSubmitNote(ev) {
        ev.preventDefault()
        const { target } = ev
        const textInput = target.txt.value
        const noteData = target.noteData ? target.noteData.value : false
        target.txt.value = ''
        if (noteData) target.noteData.value = ''
        const note = noteService.createNote(noteType, textInput, noteData)
        addNote(note)
    }

    const handleNoteTypeChange = (e) => {
        const { id } = e.target
        const mappedType = id === 'note-txt' ? 'NoteTxt' :
                       id === 'note-img' ? 'NoteImg' :
                       id === 'note-vid' ? 'NoteVid' :
                       id === 'note-todos' ? 'NoteTodos' : 'NoteTxt'

    setNoteType(mappedType)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitNote(e)
    }
  }
    return (
        <form onSubmit={handleSubmitNote} className="flex create-form">
            <section className="note-creator-container">
                <div>
                {noteType === 'NoteTxt' ? (
                        <input
                            id="txt"
                            name="txt"
                            type="text"
                            placeholder={PLACEHOLDER[noteType]}
                            onKeyDown={handleKeyDown}
                        />
                    ) : (
                        <input
                            className="note-data"
                            placeholder={PLACEHOLDER[noteType]}
                            type="text"
                            id="noteData"
                            name="noteData"
                        />
                    )}
                </div>
                <div className="options-container">
                    <label htmlFor="note-txt"><span className="material-symbols-outlined icon-btn">article</span></label>
                    <input type="radio"
                        name="note-type"
                        id="note-txt"
                        className="radio-btn-hidden"
                        defaultChecked
                        onChange={handleNoteTypeChange} />
                    <label htmlFor="note-img"><span className="material-symbols-outlined icon-btn">image</span></label>
                    <input type="radio"
                        name="note-type"
                        id="note-img"
                        className="radio-btn-hidden"
                        onChange={handleNoteTypeChange} />
                    <label htmlFor="note-vid"><span className="material-symbols-outlined icon-btn">smart_display</span></label>
                    <input type="radio"
                        name="note-type"
                        id="note-vid"
                        className="radio-btn-hidden"
                        onChange={handleNoteTypeChange} />
                    <label htmlFor="note-todos"><span className="material-symbols-outlined icon-btn">list_alt</span></label>
                    <input type="radio"
                        name="note-type"
                        id="note-todos"
                        className="radio-btn-hidden"
                        onChange={handleNoteTypeChange} />
                </div>

                <button className="close-btn" ><p>Close</p> </button>
            </section>
        </form>
    )

}